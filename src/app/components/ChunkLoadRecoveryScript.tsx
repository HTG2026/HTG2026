const INLINE_SCRIPT = `(function(){var k='chunk-load-retry';function c(e){if(!e)return!1;var m=(e.message||e.reason?.message||'')+'';var n=(e.name||e.reason?.name||'')+'';return n==='ChunkLoadError'||m.indexOf('Loading chunk')!==-1||m.indexOf('Loading CSS chunk')!==-1}window.addEventListener('unhandledrejection',function(e){if(c(e.reason)){e.preventDefault();if(sessionStorage.getItem(k)!=='1'){sessionStorage.setItem(k,'1');window.location.reload()}else{sessionStorage.removeItem(k)}}})})();`;

export default function ChunkLoadRecoveryScript() {
  return <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />;
}
