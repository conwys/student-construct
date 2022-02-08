function formatDoc(cmd, value=null) {
    if(value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd);
    }
}

function link() {
    const url = prompt('Type URL');
    formatDoc('createLink', url);
}

const editor = document.getElementById('editor');

editor.addEventListener('mouseenter', function() {
    const linkClickable = editor.querySelectorAll('a');
    linkClickable.forEach(item=> {
        item.addEventListener('mouseenter', function() {
            editor.setAttribute('contenteditable', true);
            item.target='_blank';
        })
        item.addEventListener('mouseleave', function() {
            editor.setAttribute('contenteditable', true);
        })
    })
})

const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		editor.textContent = editor.innerHTML;
		editor.setAttribute('contenteditable', false);
	} else {
		editor.innerHTML = editor.textContent;
		editor.setAttribute('contenteditable', true);
	}
})

function selectSize(value) {
    if(value==='cus') {
        const size = prompt('Type Size');
        document.execCommand('fontSize', size);
    } else {
        document.execCommand('fontSize', value);
    }
}

const filename = document.getElementById('filename');

function fileHandle(value) {
    if(value === 'new') {
        editor.innerHTML = '';
        filename.value = 'untitled';
    } else if(value==='wrd') {
        const htmContents = new Blob([editor.innerText]);
        const url = URL.createObjectURL(htmContents);
        const link = document.createElement('temp');
        link.href = url;
        link.download = `${filename.value}.docx`;
        link.click();
    } else if(value === 'pdf') {
        html2pdf(editor).save(filename.value);
    }
}
