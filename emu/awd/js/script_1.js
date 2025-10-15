// Warning
console.log('%cHey!!!!!!\nDo NOT Paste Anything Here!\n%cThis will allow attackers to access your account.', 'font-size:250%;font-weight:bolder;', '');

// Functions
window.account = {
  logged: function(){
    if (!document.cookie.includes('FshAccountToken=')) return false;
    return document.cookie.split('FshAccountToken=')[1].split(';')[0].length > 60;
  },
  login: function(){
    return new Promise((resolve, reject) => {
      if(window.account.logged())reject();
      let width = window.screen.width * 0.25;
      let height = window.screen.height * 0.55;
      let left = (window.screen.width - width) / 2;
      let top = (window.screen.height - height) / 2;
      let popup = window.open('https://account.fsh.plus/login#'+location.host, 'fsh_login', `left=${left},top=${top},width=${width},height=${height},resizable=yes`);
      function check() {
        if (popup.closed) {
          clearInterval(int)
          resolve(true);
        }
      }
      var int = setInterval(function(){check()}, 900);
    })
  },
  logout: function(){
    fetch('https://account.fsh.plus/api/logout?cookie='+encodeURIComponent(document.cookie), { method: 'POST' })
      .then(res=>res.json())
      .then(res=>{location.reload()})
  },
  info: function(){
    return new Promise((resolve, reject) => {
      fetch('https://account.fsh.plus/api/me?cookie='+encodeURIComponent(document.cookie))
        .then(res=>res.json())
        .then(res=>{
          if (res.err) throw new Error(res.msg);
          resolve(res)
        })
        .catch(err=>{
          reject(err)
        })
    });
  }
}

// Theming
window.addEventListener('DOMContentLoaded', ()=>{
  const mainColors = {
    dark: '',
    light: `--bg-0: #ffffff;
--bg-1: #dddddd;
--bg-2: #bbbbbb;
--bg-3: #888888;
--bg-4: #666666;
--text-0: #0c0c0c;
--text-1: #181818;
--text-2: #252525;
--text-3: #333333;`,
    cherry: `--bg-0: oklch(0.58 0.20 337);
--bg-1: oklch(0.60 0.15 335);
--bg-2: oklch(0.64 0.13 335);
--bg-3: oklch(0.66 0.15 335);
--bg-4: oklch(0.68 0.17 335);
--text-0: oklch(0.83 0.15 335);
--text-1: oklch(0.95 0.15 355);
--text-2: oklch(0.92 0.15 335);
--text-3: oklch(0.89 0.15 335);`,
    cosmos: `--bg-0: #24003d;
--bg-1: #2f004f;
--bg-2: #3d0068;
--bg-3: #37005e;
--bg-4: #1f0035;
--text-0: #a773f3;
--text-1: #ddc4ff;
--text-2: #c7a1ff;
--text-3: #a281d1;`,
    ice: `--bg-0: #4477dd;
--bg-1: #5588dd;
--bg-2: #6699dd;
--bg-3: #77aadd;
--bg-4: #88bbdd;
--text-0: #ddddee;
--text-1: #ccddee;
--text-2: #bbddee;
--text-3: #aaccee;`,
    darkish: `--bg-0: #1b1e25;
--bg-1: #232933;
--bg-2: #323a47;
--bg-3: #404a61;
--bg-4: #384050;
--text-0: #e5efff;
--text-1: #c7d0e1;
--text-2: #9298a3;
--text-3: #62656b;
--black-1: #666;
--black-2: #222;
--white-1: #ddd;
--white-2: #bbb;
--red-1: #b05f5f;
--red-2: #874444;
--yellow-1: #b0a35f;
--yellow-2: #878544;
--green-1: #5fb05f;
--green-2: #448744;
--aqua-1: #5fadb0;
--aqua-2: #448782;
--blue-1: #685fb0;
--blue-2: #4c4487;
--purple-1: #975fb0;
--purple-2: #7a4487;`
  };
  const coloring = {
    none: '',
    red_green: `--black-1: #666;
--black-2: #222;
--white-1: #ddd;
--white-2: #bbb;
--red-1: #d86;
--red-2: #b42;
--yellow-1: #bb4;
--yellow-2: #992;
--green-1: #6d8;
--green-2: #2b4;
--aqua-1: #6af;
--aqua-2: #48d;
--blue-1: #66d;
--blue-2: #22b;
--purple-1: #d6f;
--purple-2: #b2d;`,
    blue_yellow: `--black-1: #666;
--black-2: #222;
--white-1: #ddd;
--white-2: #bbb;
--red-1: #d66;
--red-2: #b22;
--yellow-1: #ed2;
--yellow-2: #cb0;
--green-1: #8d6;
--green-2: #4b2;
--aqua-1: #4dd;
--aqua-2: #2bb;
--blue-1: #66d;
--blue-2: #22b;
--purple-1: #d5e;
--purple-2: #b1c;`
  }
  const fonts = {
    lexend: 'Lexend, Arial, sans-serif',
    arial: 'Arial, Lexend, sans-serif',
    comicsans: "'Comic Sans MS', 'Comic Sans', cursive",
    opendyslexic: "OpenDyslexic, 'Comic Sans MS', 'Comic Sans', cursive",
    system: 'system-ui, sans-serif'
  };
  function theme(opts) {
    let s = document.createElement('style');
    s.innerHTML = `:root {
  ${mainColors[opts.theme]}

  ${coloring[opts.coloring]}
}
body {
  font-family: ${fonts[opts.font]};
}`;
    document.body.appendChild(s);
  }

  if (window.account.logged()) {
    fetch('https://account.fsh.plus/api/themes?cookie='+encodeURIComponent(document.cookie))
      .then(res=>res.json())
      .then(res=>theme(res))
  }
});