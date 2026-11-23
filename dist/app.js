async function photoRequest(operation, mode = 'readonly') {
  const database = await new Promise((resolve, reject) => {
    const request = indexedDB.open('hlavutelo-photos', 1);

    request.onupgradeneeded = () => request.result.createObjectStore('roll', {
      keyPath: 'id'
    });

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => reject(request.error);
  });

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction('roll', mode);
      const request = operation(transaction.objectStore('roll'));

      transaction.oncomplete = () => resolve(request.result);

      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

function PhotoImage({
  record
}) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const value = URL.createObjectURL(record.blob);
    setUrl(value);
    return () => URL.revokeObjectURL(value);
  }, [record.blob]);
  return url ? React.createElement("img", {
    src: url,
    alt: record.name
  }) : null;
}

function Photos({
  openCamera
}) {
  const [records, setRecords] = useState(null),
        [selected, select] = useState(null);
  const [error, setError] = useState(''),
        [attempt, retry] = useState(0);
  const dialog = useRef(null);
  useEffect(() => {
    let active = true;
    photoRequest(store => store.getAll()).then(rows => {
      if (active) setRecords(rows.sort((a, b) => b.date - a.date));
    }).catch(() => {
      if (active) setError('Your browser could not open the local photo roll.');
    });
    return () => {
      active = false;
    };
  }, [attempt]);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  async function remove() {
    try {
      await photoRequest(store => store.delete(selected.id), 'readwrite');
      setRecords(rows => rows.filter(row => row.id !== selected.id));
      select(null);
    } catch {
      setError('Could not delete this photo. Try again.');
    }
  }

  return React.createElement("div", null, React.createElement("h3", null, "Photos"), React.createElement("p", null, "Your photo roll stays in this browser on this device."), error && React.createElement("p", {
    role: "alert"
  }, error, " ", React.createElement("button", {
    className: "action",
    onClick: () => {
      setError('');
      retry(value => value + 1);
    }
  }, "Retry")), records === null && !error && React.createElement("p", null, "Loading photos\u2026"), records?.length === 0 && React.createElement("p", null, "Your roll is empty. Capture a photo or choose one in Camera."), React.createElement("button", {
    className: "action",
    onClick: openCamera
  }, "Open Camera"), React.createElement("div", {
    className: "roll"
  }, records?.map(record => React.createElement("button", {
    key: record.id,
    onClick: () => select(record)
  }, React.createElement(PhotoImage, {
    record: record
  }), React.createElement("small", null, new Date(record.date).toLocaleString())))), selected && React.createElement("dialog", {
    className: "photoViewer",
    ref: dialog,
    onCancel: e => {
      e.preventDefault();
      select(null);
    },
    onKeyDown: e => {
      if (e.key === 'Escape') e.stopPropagation();
    }
  }, React.createElement(PhotoImage, {
    record: selected
  }), React.createElement("div", {
    className: "viewerControls"
  }, React.createElement("button", {
    onClick: () => select(null)
  }, "Back to roll"), React.createElement("button", {
    onClick: remove
  }, "Delete photo"))));
}

const sampleFeed = [{
  id: 'A01',
  region: ' North ',
  visits: '12'
}, {
  id: 'A02',
  region: 'south',
  visits: '8'
}, {
  id: 'A01',
  region: ' North ',
  visits: '12'
}, {
  id: 'A03',
  region: 'north',
  visits: '5'
}, {
  id: 'A04',
  region: 'South ',
  visits: '7'
}];

function cleanRecords(feed) {
  const ids = new Set();
  return feed.filter(row => {
    if (ids.has(row.id)) return false;
    ids.add(row.id);
    return true;
  }).map(row => ({
    id: row.id,
    region: row.region.trim().toLowerCase(),
    visits: Number(row.visits)
  }));
}

function DataTable({
  rows
}) {
  if (!rows.length) return React.createElement("p", null, "No matching rows.");
  const columns = Object.keys(rows[0]);
  return React.createElement("table", {
    className: "etlTable"
  }, React.createElement("thead", null, React.createElement("tr", null, columns.map(col => React.createElement("th", {
    key: col
  }, col)))), React.createElement("tbody", null, rows.map((row, i) => React.createElement("tr", {
    key: i
  }, columns.map(col => React.createElement("td", {
    key: col
  }, String(row[col])))))));
}

function Pipeline() {
  const [stage, setStage] = useState(0),
        [query, setQuery] = useState('total'),
        [region, setRegion] = useState('north'),
        [result, setResult] = useState(null);
  const rows = cleanRecords(sampleFeed);

  function run() {
    if (query === 'region') setResult(rows.filter(row => row.region === region));else {
      const totals = new Map();
      rows.forEach(row => totals.set(row.region, (totals.get(row.region) || 0) + row.visits));
      setResult(Array.from(totals, ([region, total_visits]) => ({
        region,
        total_visits
      })).sort((a, b) => a.region.localeCompare(b.region)));
    }
  }

  if (!stage) return React.createElement("button", {
    className: "action etlStart",
    onClick: () => setStage(1)
  }, "Try the ETL demo");
  const sql = query === 'total' ? 'SELECT region, SUM(visits) AS total_visits\nFROM visits GROUP BY region ORDER BY region;' : "SELECT id, region, visits FROM visits\nWHERE region = '" + region + "';";
  return React.createElement("section", {
    className: "etl"
  }, React.createElement("h4", null, "Healthcare ETL demo"), React.createElement("small", null, "Synthetic clinic visit counts \xB7 runs in your browser"), stage === 1 && React.createElement(React.Fragment, null, React.createElement("h5", null, "Extract \xB7 Raw feed"), React.createElement("pre", null, JSON.stringify(sampleFeed, null, 1)), React.createElement("button", {
    className: "action",
    onClick: () => setStage(2)
  }, "Clean records")), stage === 2 && React.createElement(React.Fragment, null, React.createElement("h5", null, "Transform \xB7 Clean rows"), React.createElement("p", null, "Removed the repeated A01, trimmed and lowercased region names, and converted visit counts to integers."), React.createElement(DataTable, {
    rows: rows
  }), React.createElement("button", {
    className: "action",
    onClick: () => setStage(3)
  }, "Load 4 rows")), stage === 3 && React.createElement(React.Fragment, null, React.createElement("h5", null, "Load \xB7 Explore visits"), React.createElement("p", null, "Four rows loaded into the in-memory visits table. Choose a query to see its result."), React.createElement("label", null, "Query ", React.createElement("select", {
    value: query,
    onChange: e => {
      setQuery(e.target.value);
      setResult(null);
    }
  }, React.createElement("option", {
    value: "total"
  }, "Total visits by region"), React.createElement("option", {
    value: "region"
  }, "Records for one region"))), query === 'region' && React.createElement("label", null, "Region ", React.createElement("select", {
    value: region,
    onChange: e => {
      setRegion(e.target.value);
      setResult(null);
    }
  }, React.createElement("option", null, "north"), React.createElement("option", null, "south"))), React.createElement("pre", null, sql), React.createElement("button", {
    className: "action",
    onClick: run
  }, "Run example"), result && React.createElement(DataTable, {
    rows: result
  })), React.createElement("button", {
    className: "etlReset",
    onClick: () => {
      setStage(0);
      setResult(null);
      setQuery('total');
      setRegion('north');
    }
  }, "Close demo"));
}

function Camera({
  openRoll
}) {
  const [mode, setMode] = useState('idle');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const record = useRef(null);
  const [keep, setKeep] = useState('ready');
  const video = useRef(null);
  const stream = useRef(null);
  const revision = useRef(0);
  const picker = useRef(null);

  function stop() {
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
  }

  useEffect(() => () => {
    revision.current++;
    stop();
  }, []);
  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  async function start() {
    const version = ++revision.current;
    setMessage('');
    setPhoto('');
    stop();
    setMode('starting');

    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
      const active = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: {
            ideal: 'environment'
          },
          width: {
            ideal: 1920
          },
          height: {
            ideal: 1080
          }
        }
      });

      if (revision.current !== version) {
        active.getTracks().forEach(track => track.stop());
        return;
      }

      stream.current = active;
      video.current.srcObject = active;
      await video.current.play();
      if (revision.current === version) setMode('live');
    } catch (err) {
      if (revision.current !== version) return;
      stop();
      setMode('idle');
      setMessage(err.name === 'NotAllowedError' ? 'Camera access is off. Allow it in your browser or choose a photo.' : 'Live camera unavailable. Choose a photo or use your device camera below.');
    }
  }

  function review(blob) {
    revision.current++;
    stop();
    record.current = {
      id: crypto.randomUUID(),
      blob,
      date: Date.now()
    };
    setKeep('ready');
    setPhoto(URL.createObjectURL(blob));
    setMessage('');
    setMode('review');
  }

  function shoot() {
    const frame = video.current;

    if (!frame?.videoWidth) {
      setMessage('Waiting for the first frame. Try again in a moment.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = frame.videoWidth;
    canvas.height = frame.videoHeight;
    canvas.getContext('2d').drawImage(frame, 0, 0);
    const version = revision.current;
    canvas.toBlob(blob => {
      if (version !== revision.current) return;
      if (blob) review(blob);else setMessage('Could not capture this frame. Try again.');
    }, 'image/jpeg', 0.94);
  }

  const [filename, nameFile] = useState('hlavutelo-photo.jpg');

  async function keepPhoto() {
    const current = record.current;
    setKeep('saving');

    try {
      await photoRequest(store => store.put({ ...current,
        name: filename
      }), 'readwrite');
      if (record.current === current) setKeep('saved');
    } catch {
      if (record.current === current) {
        setKeep('ready');
        setMessage('Could not keep this photo. Download it to save a copy.');
      }
    }
  }

  return React.createElement("div", {
    className: "cameraApp"
  }, React.createElement("h3", null, "Camera"), React.createElement("div", {
    className: "viewfinder"
  }, React.createElement("video", {
    ref: video,
    autoPlay: true,
    muted: true,
    playsInline: true,
    hidden: mode !== 'live'
  }), mode === 'review' && React.createElement("img", {
    src: photo,
    alt: "Your photo preview",
    onError: () => {
      setPhoto('');
      setMode('idle');
      setMessage('This image format cannot be previewed. Choose a JPEG or PNG.');
    }
  }), (mode === 'idle' || mode === 'starting') && React.createElement("div", {
    className: "cameraIntro"
  }, React.createElement("i", {
    className: "object Camera",
    "aria-hidden": "true"
  }, React.createElement("i", null)), React.createElement("p", null, mode === 'starting' ? 'Opening camera…' : 'Frame something that catches your eye.'))), React.createElement("div", {
    className: "cameraControls"
  }, mode === 'idle' && React.createElement("button", {
    onClick: start
  }, "Enable camera"), mode === 'live' && React.createElement("button", {
    className: "shutter",
    onClick: () => {
      nameFile('hlavutelo-photo.jpg');
      shoot();
    }
  }, "Capture photo"), mode === 'review' && React.createElement(React.Fragment, null, React.createElement("button", {
    disabled: keep !== 'ready',
    onClick: keepPhoto
  }, keep === 'saved' ? 'Kept in Photos' : keep === 'saving' ? 'Saving…' : 'Keep in Photos'), keep === 'saved' && React.createElement("button", {
    onClick: openRoll
  }, "View in Photos"), React.createElement("a", {
    href: photo,
    download: filename
  }, "Download"), React.createElement("button", {
    onClick: start
  }, "Retake")), React.createElement("button", {
    onClick: () => picker.current.click()
  }, "Choose photo"), React.createElement("input", {
    ref: picker,
    type: "file",
    hidden: true,
    accept: "image/*",
    capture: "environment",
    onChange: e => {
      const f = e.target.files?.[0];
      e.target.value = '';

      if (f) {
        nameFile(f.name);
        review(f);
      }
    }
  })), React.createElement("p", {
    className: "cameraStatus",
    role: "status"
  }, message || 'Photos stay on your device.'));
}

const {
  useState,
  useEffect,
  useRef
} = React;
const projects = [['FitForge', 'React · TypeScript', 'A mobile-first fitness app for planning workouts, logging nutrition and tracking progress.', 'assets/fitforge.svg', 'https://fitforge-ide-handoff.web.app'], ['Healthcare_DB', 'Python · pandas · PostgreSQL', 'An ETL pipeline that turns nested CDC records into relational tables for SQL analysis.', 'assets/healthcare.webp', 'https://github.com/Maluleke21/healthcare_db-etl-pipeline'], ['Mn’wanati', 'AI · IoT · GIS', 'A water-management prototype exploring how sensor readings and location data can help identify leaks.', '', ''], ['Fredrose Security', 'React · TypeScript · Vite', 'A responsive service directory and enquiry flow for a South African security company.', 'assets/fredrose.webp', 'https://github.com/Maluleke21/fredrose-Security']];
const apps = ['Finder', 'Safari', 'Notes', 'Calendar', 'Mail', 'Camera', 'Photos'];

function AppIcon({
  name,
  date
}) {
  return React.createElement("span", {
    className: 'object ' + name,
    "aria-hidden": "true"
  }, React.createElement("i", null, name === 'Calendar' ? date.toLocaleDateString('en-GB', {
    day: 'numeric',
    timeZone: 'Africa/Johannesburg'
  }) : null));
}

const linkedin = 'https://www.linkedin.com/in/hlavutelo-denrol-maluleke-321837296/';
const email = 'malulekedenrol@gmail.com';

function App() {
  const [locked, setLocked] = useState(true),
        [app, setApp] = useState(''),
        [index, select] = useState(0),
        [date, setDate] = useState(new Date());
  const start = useRef(0),
        opener = useRef(null),
        lockButton = useRef(null),
        panel = useRef(null);

  const open = name => {
    setLocked(false);
    setApp(name);
  };

  function close() {
    setApp('');
    requestAnimationFrame(() => opener.current?.focus());
  }

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (app) panel.current?.focus();

    const key = e => {
      if (e.key === 'Escape' && app) close();else if (locked && e.key === 'Enter' && document.activeElement === document.body) setLocked(false);
    };

    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [locked, app]);
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Johannesburg'
  });
  const day = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Africa/Johannesburg'
  });
  const item = projects[index];
  const cv = 'assets/Hlavutelo-Maluleke-CV.pdf';
  return React.createElement("main", {
    className: locked ? 'locked' : 'desktop',
    onTouchStart: e => start.current = e.touches[0].clientY,
    onTouchEnd: e => {
      if (locked && start.current - e.changedTouches[0].clientY > 55) setLocked(false);
    }
  }, React.createElement("div", {
    className: "wall"
  }), React.createElement("header", null, React.createElement("b", null, React.createElement("i", {
    className: "mark"
  }, "h."), " Hlavutelo"), React.createElement("span", {
    className: "system"
  }, locked ? 'Lock screen' : app || 'Finder'), React.createElement("span", {
    className: "place"
  }, "Johannesburg, ZA ", React.createElement("em", null), " SAST"), !locked && React.createElement("button", {
    onClick: () => {
      setApp('');
      setLocked(true);
      requestAnimationFrame(() => lockButton.current?.focus());
    }
  }, "Lock")), locked ? React.createElement("section", {
    className: "cover"
  }, React.createElement("div", {
    className: "clock"
  }, React.createElement("p", null, day), React.createElement("h1", null, time)), React.createElement("div", {
    className: "identity"
  }, React.createElement("div", {
    className: "eyebrow"
  }, React.createElement("span", null), " Personal portfolio"), React.createElement("h2", null, "Hlavutelo", React.createElement("br", null), React.createElement("i", null, "Maluleke.")), React.createElement("p", null, "Software developer & data engineer")), React.createElement("button", {
    ref: lockButton,
    className: "unlock",
    onClick: () => setLocked(false)
  }, React.createElement("strong", null, "\u2303"), " Open desktop"), React.createElement("button", {
    className: "notice",
    onClick: () => open('Finder')
  }, React.createElement("span", {
    className: "mini"
  }, "h."), React.createElement("span", null, React.createElement("small", null, "Finder ", React.createElement("time", null, "now")), React.createElement("b", null, "Selected projects"), React.createElement("span", null, "Explore my software and data work.")))) : React.createElement(React.Fragment, null, React.createElement("div", {
    className: "shortcuts"
  }, apps.map(n => React.createElement("button", {
    key: n,
    onClick: e => {
      opener.current = e.currentTarget;
      open(n);
    }
  }, React.createElement(AppIcon, {
    name: n,
    date: date
  }), n))), !app && React.createElement("div", {
    className: "deskTitle"
  }, React.createElement("div", {
    className: "eyebrow"
  }, React.createElement("span", null), " Personal workspace"), React.createElement("h2", null, "Hlavutelo\u2019s", React.createElement("br", null), React.createElement("i", null, "desktop."))), app && React.createElement("section", {
    className: "window",
    ref: panel,
    tabIndex: -1,
    "aria-label": app
  }, React.createElement("div", {
    className: "bar"
  }, React.createElement("button", {
    onClick: close,
    "aria-label": "Close window"
  }, "\xD7"), React.createElement("b", null, app)), React.createElement("div", {
    className: "inside"
  }, app === 'Finder' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "eyebrow"
  }, "Project archive"), React.createElement("h3", null, "Selected work"), React.createElement("div", {
    className: "projectGrid"
  }, React.createElement("nav", null, React.createElement("button", {
    "aria-pressed": index === -1,
    onClick: () => select(-1)
  }, "CV"), projects.map((p, i) => React.createElement("button", {
    "aria-pressed": index === i,
    key: p[0],
    onClick: () => select(i)
  }, p[0]))), index === -1 ? React.createElement("article", {
    className: "cvFile"
  }, React.createElement("h4", null, "Hlavutelo Maluleke \xB7 CV"), React.createElement("p", null, "PDF \xB7 6 pages"), React.createElement("div", null, React.createElement("a", {
    href: cv,
    download: "Hlavutelo-Maluleke-CV.pdf"
  }, "Download CV"), React.createElement("a", {
    href: cv,
    target: "_blank",
    rel: "noreferrer"
  }, "Open full size")), React.createElement("object", {
    data: cv,
    type: "application/pdf",
    "aria-label": "Hlavutelo Maluleke CV preview"
  }, React.createElement("p", null, "Use Open full size to read the PDF."))) : React.createElement("article", null, item[3] && React.createElement("img", {
    className: 'projectImage p' + index,
    src: item[3],
    alt: item[0] + ' project preview'
  }), React.createElement("h4", null, item[0]), React.createElement("small", null, item[1]), React.createElement("p", null, item[2]), item[4] && React.createElement("a", {
    href: item[4],
    target: "_blank",
    rel: "noreferrer"
  }, index === 0 ? 'Open app' : 'View repository'), index === 1 && React.createElement(Pipeline, null)))), app === 'Safari' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "eyebrow"
  }, "Bookmarks"), React.createElement("h3", null, "On the web"), [['GitHub', 'Source code', 'https://github.com/Maluleke21'], ['FitForge', 'Live fitness app', projects[0][4]], ['LinkedIn', 'Professional profile', linkedin]].map(([n, d, u]) => React.createElement("a", {
    className: "row",
    href: u,
    target: "_blank",
    rel: "noreferrer",
    key: n
  }, React.createElement("b", null, n), React.createElement("small", null, d)))), app === 'Notes' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "eyebrow"
  }, "About me"), React.createElement("h3", null, "Developer\u2019s notes"), React.createElement("p", null, "I\u2019m Hlavutelo Maluleke, a software developer and data engineer based in Johannesburg. At FNB, I worked with the Dynamic Decisioning team on scoring workflows and data pipelines."), React.createElement("h4", null, "Building a healthcare pipeline"), React.createElement("p", null, "I used Python and pandas to clean nested CDC records before loading them into PostgreSQL. Keeping extraction, transformation and loading separate made it easier to trace a SQL result back to its source."), React.createElement("button", {
    className: "action",
    onClick: () => {
      select(1);
      open('Finder');
    }
  }, "Explore Healthcare_DB")), app === 'Calendar' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "eyebrow"
  }, "Career timeline"), React.createElement("h3", null, "Experience"), [['Apr 2025 – Apr 2026', 'FNB · Dynamic Decisioning', 'Developed and tested scoring workflows with Camunda, SQL and Spark.'], ['Sep 2024 – Mar 2025', 'CAPACITI / UVU Africa', 'Data engineering internship focused on ETL, cleaning data and Agile delivery.'], ['2023', 'IIE Rosebank College', 'Completed a Diploma in Information Technology in Software Development.']].map(([d, n, s]) => React.createElement("div", {
    className: "row",
    key: d
  }, React.createElement("small", null, d), React.createElement("b", null, n), React.createElement("p", null, s)))), app === 'Camera' && React.createElement(Camera, {
    openRoll: () => open('Photos')
  }), app === 'Photos' && React.createElement(Photos, {
    openCamera: () => open('Camera')
  }), app === 'Mail' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "eyebrow"
  }, "Contact"), React.createElement("h3", null, "Get in touch"), React.createElement("p", null, "For software development, data engineering and project enquiries."), email && React.createElement("a", {
    className: "row",
    href: 'mailto:' + email
  }, React.createElement("b", null, "Email"), React.createElement("small", null, email)), React.createElement("a", {
    className: "row",
    href: linkedin,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement("b", null, "LinkedIn"), React.createElement("small", null, "Hlavutelo Denrol Maluleke"))))), React.createElement("nav", {
    className: "dock",
    "aria-label": "Applications"
  }, apps.map(n => React.createElement("button", {
    title: n,
    "aria-label": n,
    "aria-pressed": app === n,
    key: n,
    onClick: e => {
      opener.current = e.currentTarget;
      open(n);
    }
  }, React.createElement(AppIcon, {
    name: n,
    date: date
  }))))));
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));