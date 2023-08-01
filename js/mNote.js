document.addEventListener('DOMContentLoaded', (event) => {

document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.content-section.active').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(this.getAttribute('href')).classList.add('active');
      });
});


// First, include the marked library in your HTML file

const fileNames = ['txt/file0.txt', 'txt/file1.txt', 'txt/file2.txt', 'txt/file3.txt', 'txt/file4.txt', 'txt/file5.txt', 'txt/file6.txt', 'txt/file7.txt', 'txt/file8.txt', 'txt/file9.txt', 'txt/file10.txt', 'txt/file11.txt', 'txt/file12.txt', 'txt/file13.txt'];

fileNames.forEach((fileName, index) => {
  fetch(fileName)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      let lines = data.split('\n');
      let container = document.getElementById('pre' + index);

      lines.forEach(line => {
        // Check if the line is an image reference in markdown
        if (line.startsWith('![') && line.includes('](') && line.endsWith(')')) {
          let imagePath = line.split('](')[1].slice(0, -1); // remove the prefix up to "](" and ")" suffix
          let imgElement = document.createElement('img');
          imgElement.src = imagePath;
          container.appendChild(imgElement);
        } else {
          // Create a new text node and set its content to the line
          let textNode = document.createTextNode(line);
          // Create a new paragraph element and append the text node to it
          let pElement = document.createElement('p');
          pElement.appendChild(textNode);
          container.appendChild(pElement);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching file:', error);
    });
});
});