const container = document.getElementById("bubble-container");

// Load the pop sound
const popSound = new Audio("sounds/pop.mp3");

const bubbleData = [
{ xPercent: 1 , yPercent: 0 , content: ' You can make it through it all' },
{ xPercent: 3 , yPercent: 30 , content: "<img src = 'img/Jo1.png' alt=Jo1 />" },
{ xPercent: 0 , yPercent: 65 , content: ' 💙You make me really happy💙' },
{ xPercent: 5 , yPercent: 90 , content: ' I miss you a lot ' },

{ xPercent: 12 , yPercent: 15 , content: "<img src = 'img/Jo2.png' alt=Jo2 />" },
{ xPercent: 16 , yPercent: 60 , content: ' 💞I am always here for you 💞' },

{ xPercent: 29 , yPercent: 10 , content: ' ❤️You are adorable my honeybun❤️' },
{ xPercent: 33 , yPercent: 45 , content: "<img src = 'img/Jo3.png' alt=Jo3 />" },
{ xPercent: 25 , yPercent: 74 , content: ' You are going to be okay ' },

{ xPercent: 48 , yPercent: 0 , content: "<img src = 'img/Jo4.png' alt=Jo4 />" },
{ xPercent: 44 , yPercent: 37 , content: ' ❤️YOU ARE THE BEST❤️' },
{ xPercent: 42 , yPercent: 67 , content: "<img src = 'img/Jo5.png' alt=Jo5 />" },

{ xPercent: 58 , yPercent: 15 , content: ' Looking forward to next year too...' },
{ xPercent: 63 , yPercent: 39 , content: '❤️I am so damn proud of you ❤️' },
{ xPercent: 60 , yPercent: 70 , content: ' You are going to do amazing things' },

{ xPercent: 71 , yPercent: 0 , content: ' You are capable of amazing things ' },
{ xPercent: 73 , yPercent: 33 , content: '💙Your presence makes big difference in life💙' },
{ xPercent: 76 , yPercent: 65 , content: "<img src = 'img/Jo6.png' alt=Jo6 />" },
{ xPercent: 70 , yPercent: 83 , content: ' 💞Everything will be alright💞' },

{ xPercent: 82 , yPercent: 15 , content: "<img src = 'img/Jo7.png' alt=Jo7 />" },
{ xPercent: 20 , yPercent: 38 , content: ' I will protect you forever ' },
{ xPercent: 85 , yPercent: 75 , content: '❤️I LOVE YOU❤️' },
];

bubbleData.forEach(data => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  bubble.style.left = `${data.xPercent}%`;
  bubble.style.top = `${data.yPercent}%`;
  bubble.style.transform = "translate(-50%, -50%)";

  ["click", "touchstart"].forEach(evt => {
    bubble.addEventListener(evt, (e) => {
      e.preventDefault();
      popSound.currentTime = 0;
      popSound.play();

      bubble.classList.add("pop");

      setTimeout(() => {
        const reveal = document.createElement("div");
        reveal.classList.add("reveal");
        reveal.style.left = `${data.xPercent}%`;
        reveal.style.top = `${data.yPercent}%`;
        reveal.style.transform = "translate(-50%, -50%)";
        reveal.innerHTML = data.content;

        container.appendChild(reveal);
        bubble.remove();

      }, 300);
    });
  });

  container.appendChild(bubble);
});


document.addEventListener("click", createRipple);
document.addEventListener("touchstart", createRipple);

function createRipple(event) {
  const container = document.getElementById("animation-container");
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");

  const x = event.clientX || event.touches[0].clientX;
  const y = event.clientY || event.touches[0].clientY;

  ripple.style.left = `${x - 25}px`;
  ripple.style.top = `${y - 25}px`;
  ripple.style.width = `50px`;
  ripple.style.height = `50px`;

  container.appendChild(ripple);

  // Remove after animation ends
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}


const overlay = document.getElementById("overlay");

  const removeOverlay = () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);

    // Start music (if applicable)
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic) bgMusic.play();

    // You can also trigger bubbles or other actions here

    document.removeEventListener("click", removeOverlay);
    document.removeEventListener("touchstart", removeOverlay);
  };

  document.addEventListener("click", removeOverlay);
  document.addEventListener("touchstart", removeOverlay);

document.querySelectorAll('.bubble').forEach(bubble => {
  bubble.addEventListener('click', () => {
    const targetId = bubble.getAttribute('data-content');
    const content = document.getElementById(targetId);

    // Add fade-out animation
    bubble.classList.add('pop');

    // Show content after animation delay
    setTimeout(() => {
      if (content) content.classList.add('show');
    }, 500);

    // Reappear bubble after 5 seconds
    setTimeout(() => {
      bubble.classList.remove('pop');     // Restore visibility
      if (content) content.classList.remove('show'); // Hide content again
    }, 5000); // Change delay as needed
  });
});
