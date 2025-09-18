// script.js
// Arabic comments explain how to edit (inside code) so you can change easily.

// Particles (RGB stars)
particlesJS('particles-js', {
  particles: {
    number: { value: 120 },
    color: { value: '#ADD8E6' },

    shape: { type: 'circle' },
    opacity: { value: 0.8 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.35, width: 1 },
    move: { enable: true, speed: 1.6, random: true, out_mode: 'out' }
  }
});

// Fetch Discord server icon automatically when hosted
(function(){
  const inviteEl = document.getElementById('invite-link');
  const serverImg = document.getElementById('server-icon');
  const serverName = document.getElementById('server-name');
  if(!inviteEl) return;
  const invite = inviteEl.getAttribute('href');
  if(!invite || invite.includes('yourcode')) return;
  // extract invite code
  const code = invite.replace(/^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com)\/(invite\/)?/i,'').split(/[?#]/)[0];
  if(!code) return;
  fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`).then(r=>r.json()).then(data=>{
    if(data.guild && data.guild.icon){
      serverImg.src = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`;
      serverImg.style.display='block';
      serverName.textContent = data.guild.name || 'My Server';
    }
  }).catch(()=>{});
})();

// Set audio volume and autoplay handling
// -- تعليق عربي: غيّر مستوى الصوت هنا إذا احتجت
const bgAudio = document.getElementById('bg-audio');
if(bgAudio){ bgAudio.volume = 0.6; bgAudio.addEventListener('play', ()=>console.log('Audio playing')); }
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');

// تشغيل/إيقاف
playBtn.addEventListener('click', () => {
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// تحديث شريط التقدم
audio.addEventListener('timeupdate', () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
});

// التغيير يدوياً
seekBar.addEventListener('input', () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});
