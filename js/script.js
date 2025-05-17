// Menu toggle
const menuBtn = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');
if(menuBtn && sideMenu){
  menuBtn.addEventListener('click',()=>sideMenu.classList.toggle('show'));
}

// Bottom bar hide on scroll
let lastY = window.scrollY;
const bottomBar = document.getElementById('bottomBar');
if(bottomBar){
  window.addEventListener('scroll',()=>{
    const curY = window.scrollY;
    if(curY > lastY){ bottomBar.classList.add('hide'); }
    else{ bottomBar.classList.remove('hide'); }
    lastY = curY;
  });
}

// TikTok-style autoplay in previews
if(document.getElementById('video-feed')){
  // Load videos from Supabase or fallback local
  async function loadVideos(){
    const feed = document.getElementById('video-feed');
    if(typeof supabase !== 'undefined'){
      // fetch from Supabase storage bucket 'previews'
      let { data, error } = await supabase.storage.from('previews').list('',{limit:50,sortBy:{column:'name',order:'desc'}});
      if(!error && data.length){
        data.forEach(file=>{
          const v = document.createElement('video');
          v.src = supabase.storage.from('previews').getPublicUrl(file.name).publicUrl;
          v.muted = true;
          v.playsInline = true;
          v.loop = true;
          feed.appendChild(v);
        });
      }
    }
    if(!feed.children.length){
      // Fallback local sample
      ['sample1.mp4','sample2.mp4'].forEach(name=>{
        const v=document.createElement('video');
        v.src = 'assets/previews/'+name;
        v.muted=true;v.loop=true;v.playsInline=true;
        feed.appendChild(v);
      });
    }
    setupObserver();
  }

  function setupObserver(){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.play().catch(()=>{}); }
        else{ entry.target.pause(); }
      });
    },{threshold:0.75});
    document.querySelectorAll('#video-feed video').forEach(v=>observer.observe(v));
  }
  loadVideos();
}
