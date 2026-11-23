async function photoRequest(operation, mode='readonly') {
  const database = await new Promise((resolve,reject) => {
    const request = indexedDB.open('hlavutelo-photos',1);
    request.onupgradeneeded = () => request.result.createObjectStore('roll',{keyPath:'id'});
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  try {
    return await new Promise((resolve,reject) => {
      const transaction = database.transaction('roll',mode);
      const request = operation(transaction.objectStore('roll'));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally { database.close(); }
}
function PhotoImage({record}) {
  const [url,setUrl]=useState('');
  useEffect(()=>{
    const value=URL.createObjectURL(record.blob);
    setUrl(value);
    return ()=>URL.revokeObjectURL(value);
  },[record.blob]);
  return url ? <img src={url} alt={record.name}/> : null;
}
function Photos({openCamera}) {
  const [records,setRecords]=useState(null), [selected,select]=useState(null);
  const [error,setError]=useState(''),[attempt,retry]=useState(0);
  const dialog=useRef(null);
  useEffect(()=>{
    let active=true;
    photoRequest(store=>store.getAll()).then(rows=>{
      if(active)setRecords(rows.sort((a,b)=>b.date-a.date));
    }).catch(()=>{if(active)setError('Your browser could not open the local photo roll.');});
    return ()=>{active=false};
  },[attempt]);
  useEffect(()=>{if(selected)dialog.current?.showModal()},[selected]);
  async function remove() {
    try {
      await photoRequest(store=>store.delete(selected.id),'readwrite');
      setRecords(rows=>rows.filter(row=>row.id!==selected.id));
      select(null);
    } catch {setError('Could not delete this photo. Try again.');}
  }
  return <div><h3>Photos</h3><p>Your photo roll stays in this browser on this device.</p>
    {error&&<p role="alert">{error} <button className="action" onClick={()=>{setError('');retry(value=>value+1)}}>Retry</button></p>}
    {records===null && !error && <p>Loading photos…</p>}
    {records?.length===0 && <p>Your roll is empty. Capture a photo or choose one in Camera.</p>}
    <button className="action" onClick={openCamera}>Open Camera</button>
    <div className="roll">{records?.map(record=><button key={record.id} onClick={()=>select(record)}><PhotoImage record={record}/><small>{new Date(record.date).toLocaleString()}</small></button>)}</div>
    {selected&&<dialog className="photoViewer" ref={dialog} onCancel={e=>{e.preventDefault();select(null)}} onKeyDown={e=>{if(e.key==='Escape')e.stopPropagation()}}>
      <PhotoImage record={selected}/><div className="viewerControls"><button onClick={()=>select(null)}>Back to roll</button><button onClick={remove}>Delete photo</button></div>
    </dialog>}
  </div>;
}
