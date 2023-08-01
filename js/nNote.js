document.addEventListener('DOMContentLoaded', (event) => {
  
const fileNames = ['txt/file0.txt', 'txt/file1.txt', 'txt/file2.txt', 'txt/file3.txt', 'txt/file4.txt', 'txt/file5.txt', 'txt/file6.txt', 'txt/file7.txt', 'txt/file8.txt', 'txt/file9.txt', 'txt/file10.txt', 'txt/file11.txt', 'txt/file12.txt', 'txt/file13.txt'];

const equations = {
    equation1: `$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$`,
    // Add more equations here if needed
  };
  
  fileNames.forEach((fileName, index) => {
      fetch(fileName)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          const processedData = data.replace(/\{\{(\w+)\}\}/g, (match, equationName) => {
            if (equations[equationName]) {
              return equations[equationName];
            }
            return match;
          });
  
          const element = document.getElementById('pre' + index);
          element.innerHTML = processedData;
  
          // Tell MathJax to typeset the new content
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
        })
        .catch(error => {
          console.error('Error fetching file:', error);
        });
    });
  });