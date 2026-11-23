function Camera({openRoll}) {
  const [mode, setMode] = useState('idle');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const record = useRef(null);
  const [keep,setKeep] = useState('ready');
  const video = useRef(null);
  const stream = useRef(null);
  const revision = useRef(0);
  const picker = useRef(null);

  function stop() {
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
  }
  useEffect(() => () => { revision.current++; stop(); }, []);
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);

  async function start() {
    const version = ++revision.current;
    setMessage('');
    setPhoto('');
    stop();
    setMode('starting');
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
      const active = await navigator.mediaDevices.getUserMedia({audio:false, video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
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
    record.current = {id:crypto.randomUUID(), blob, date:Date.now()};
    setKeep('ready');
    setPhoto(URL.createObjectURL(blob));
    setMessage('');
    setMode('review');
  }
  function shoot() {
    const frame = video.current;
    if (!frame?.videoWidth) {setMessage('Waiting for the first frame. Try again in a moment.'); return;}
    const canvas = document.createElement('canvas');
    canvas.width = frame.videoWidth;
    canvas.height = frame.videoHeight;
    canvas.getContext('2d').drawImage(frame,0,0);
    const version = revision.current;
    canvas.toBlob(blob => {
      if (version !== revision.current) return;
      if (blob) review(blob);
      else setMessage('Could not capture this frame. Try again.');
    },'image/jpeg',0.94);
  }
  const [filename, nameFile] = useState('hlavutelo-photo.jpg');
  async function keepPhoto() {
    const current=record.current;
    setKeep('saving');
    try {
      await photoRequest(store=>store.put({...current,name:filename}),'readwrite');
      if(record.current===current)setKeep('saved');
    } catch {
      if(record.current===current){setKeep('ready');setMessage('Could not keep this photo. Download it to save a copy.');}
    }
  }
  return <div className="cameraApp"><h3>Camera</h3>
    <div className="viewfinder">
      <video ref={video} autoPlay muted playsInline hidden={mode!=='live'}/>
      {mode==='review' && <img src={photo} alt="Your photo preview" onError={()=>{setPhoto('');setMode('idle');setMessage('This image format cannot be previewed. Choose a JPEG or PNG.')}}/>}
      {(mode==='idle'||mode==='starting') && <div className="cameraIntro"><i className="object Camera" aria-hidden="true"><i/></i><p>{mode==='starting'?'Opening camera…':'Frame something that catches your eye.'}</p></div>}
    </div>
    <div className="cameraControls">
      {mode==='idle'&&<button onClick={start}>Enable camera</button>}
      {mode==='live'&&<button className="shutter" onClick={()=>{nameFile('hlavutelo-photo.jpg');shoot()}}>Capture photo</button>}
      {mode==='review'&&<><button disabled={keep!=='ready'} onClick={keepPhoto}>{keep==='saved'?'Kept in Photos':keep==='saving'?'Saving…':'Keep in Photos'}</button>{keep==='saved'&&<button onClick={openRoll}>View in Photos</button>}<a href={photo} download={filename}>Download</a><button onClick={start}>Retake</button></>}
      <button onClick={()=>picker.current.click()}>Choose photo</button>
      <input ref={picker} type="file" hidden accept="image/*" capture="environment" onChange={e=>{const f=e.target.files?.[0];e.target.value='';if(f){nameFile(f.name);review(f)}}}/>
    </div><p className="cameraStatus" role="status">{message||'Photos stay on your device.'}</p>
  </div>;
}
