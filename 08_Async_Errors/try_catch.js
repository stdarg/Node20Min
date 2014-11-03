try {
  setTimeout(function() {
    console.log('Timeout!');
    throw new Error('Timeout err!');
  }, 1);
} catch(err) {
  console.log('We will never see this.');
}
