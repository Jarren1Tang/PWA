const installButton = document.getElementById('install-button');

// Add an event listener to trigger the installation prompt when the button is clicked
installButton.addEventListener('click', () => {
  // Check if the deferred prompt is available
  if (window.deferredPrompt) {
    // Show the prompt to install the app
    window.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Reset the deferredPrompt variable
      window.deferredPrompt = null;
    });
  }
});