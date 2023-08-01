document.addEventListener('DOMContentLoaded', (event) => {

    const fileNames = ['txt-DfEq/file0.txt', 'txt-DfEq/file1.txt', 'txt-DfEq/file2.txt', 'txt-DfEq/file3.txt', 'txt-DfEq/file4.txt', 'txt-DfEq/file5.txt', 'txt-DfEq/file6.txt', 'txt-DfEq/file7.txt', 'txt-DfEq/file8.txt', 'txt-DfEq/file9.txt', 'txt-DfEq/file10.txt', 'txt-DfEq/file11.txt', 'txt-DfEq/file12.txt', 'txt-DfEq/file13.txt'];

fileNames.forEach((fileName, index) => {
  fetch(fileName)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
        let lines = data.split('\n');
        let container = document.getElementById('pre' + index.toString().padStart(3, '0')); // Convert index to 'pre000' format

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