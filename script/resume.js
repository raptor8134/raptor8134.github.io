import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.mjs';
import * as pdfjsWorker from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs'; 
const url = 'pdf/James Notley - Resume.docx.pdf';
const container = document.getElementById('resume-embed');

function render_resume() {
    pdfjsLib.getDocument(url).promise.then(pdf => {
        pdf.getPage(1).then(page => {
            // Set scale based on container width
            const containerWidth = container.clientWidth;
            const viewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale: scale });

            // Create canvas element
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            // Render PDF page
            const renderContext = {
                canvasContext: context,
                viewport: scaledViewport
            };
            page.render(renderContext);

            // Add canvas to container
            container.innerHTML="";
            container.appendChild(canvas);
        });
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
};

render_resume();

window.addEventListener("resize", function() {
    console.log("working");
    render_resume();
});
