const sampleFeed=[
  {id:'A01',region:' North ',visits:'12'},
  {id:'A02',region:'south',visits:'8'},
  {id:'A01',region:' North ',visits:'12'},
  {id:'A03',region:'north',visits:'5'},
  {id:'A04',region:'South ',visits:'7'}
];
function cleanRecords(feed) {
  const ids=new Set();
  return feed.filter(row=>{
    if(ids.has(row.id))return false;
    ids.add(row.id);
    return true;
  }).map(row=>({id:row.id,region:row.region.trim().toLowerCase(),visits:Number(row.visits)}));
}
function DataTable({rows}) {
  if(!rows.length)return <p>No matching rows.</p>;
  const columns=Object.keys(rows[0]);
  return <table className="etlTable"><thead><tr>{columns.map(col=><th key={col}>{col}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{columns.map(col=><td key={col}>{String(row[col])}</td>)}</tr>)}</tbody></table>;
}
function Pipeline() {
  const [stage,setStage]=useState(0),[query,setQuery]=useState('total'),[region,setRegion]=useState('north'),[result,setResult]=useState(null);
  const rows=cleanRecords(sampleFeed);
  function run() {
    if(query==='region')setResult(rows.filter(row=>row.region===region));
    else {
      const totals=new Map();
      rows.forEach(row=>totals.set(row.region,(totals.get(row.region)||0)+row.visits));
      setResult(Array.from(totals,([region,total_visits])=>({region,total_visits})).sort((a,b)=>a.region.localeCompare(b.region)));
    }
  }
  if(!stage)return <button className="action etlStart" onClick={()=>setStage(1)}>Try the ETL demo</button>;
  const sql=query==='total'?'SELECT region, SUM(visits) AS total_visits\nFROM visits GROUP BY region ORDER BY region;':"SELECT id, region, visits FROM visits\nWHERE region = '"+region+"';";
  return <section className="etl"><h4>Healthcare ETL demo</h4><small>Synthetic clinic visit counts · runs in your browser</small>
    {stage===1&&<><h5>Extract · Raw feed</h5><pre>{JSON.stringify(sampleFeed,null,1)}</pre><button className="action" onClick={()=>setStage(2)}>Clean records</button></>}
    {stage===2&&<><h5>Transform · Clean rows</h5><p>Removed the repeated A01, trimmed and lowercased region names, and converted visit counts to integers.</p><DataTable rows={rows}/><button className="action" onClick={()=>setStage(3)}>Load 4 rows</button></>}
    {stage===3&&<><h5>Load · Explore visits</h5><p>Four rows loaded into the in-memory visits table. Choose a query to see its result.</p>
      <label>Query <select value={query} onChange={e=>{setQuery(e.target.value);setResult(null)}}><option value="total">Total visits by region</option><option value="region">Records for one region</option></select></label>
      {query==='region'&&<label>Region <select value={region} onChange={e=>{setRegion(e.target.value);setResult(null)}}><option>north</option><option>south</option></select></label>}
      <pre>{sql}</pre><button className="action" onClick={run}>Run example</button>{result&&<DataTable rows={result}/>}</>}
    <button className="etlReset" onClick={()=>{setStage(0);setResult(null);setQuery('total');setRegion('north')}}>Close demo</button>
  </section>;
}
