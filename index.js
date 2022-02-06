console.log('this is tut38');
// Exercise 5:
// You have pretend to use a word api which will contain an objcet and you have to print deffinition from all result of that word api.
// You have to take input from an input tag. 
// You have to print it  the dom
// if you are using bootstrap then its a plus

// Solving Self-

let searchBtn = document.getElementById('searchBtn')
let inputWord = document.getElementById('inputWord');
let formWord = document.getElementById('formWord') ;
inputWord.addEventListener('input', function () {
    inputWord.classList.remove('is-invalid')
});

formWord.addEventListener('submit', function(e){
    e.preventDefault();
    if (inputWord.value.length == 0) {
        inputWord.focus()
        inputWord.classList.add('is-invalid')
    }
    else {
        fetchWord();
    }
})

function fetchWord() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord.value}`, true);
    document.querySelector('.resultBox').innerHTML = `<div class="spinner-grow  d-block m-auto" style="width: 3rem; height: 3rem;" role="status">
                                                          <span class="sr-only"></span>
                                                      </div>`;
    xhr.onload = function () {
        showResult()
        if (xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
            let domResultHtml = ``;
            result.forEach(function (element) {
                let resultHtml = '';
                let meaningHtmlMain = ``;
                second();
                resultHtml += `<div class="fetchedResults mb-5">
                                    <div class="d-flex align-items-center">
                                        <h1>${element.word}</h1>
                                    </div>
                                    <hr>
                                    <div>${meaningHtmlMain}</div>
                                </div>`;

                function second() {
                    element.meanings.forEach(function (element) {
                        let meaningHtml = '';
                        let deffinitionHtml = ``;
                        third();
                        meaningHtml += `<div class="meaning">
                                            <h5 class="fst-italic">${element.partOfSpeech}</h5>
                                            <table class="table table-bordered table-striped definition">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Definition</th>
                                                        <th scope="col">Example</th>
                                                    </tr>
                                                </thead>
                                                <tbody>${deffinitionHtml}</tbody>
                                            </table>
                                        </div>`;

                        function third() {
                            element.definitions.forEach(function (element, index) {
                                deffinitionHtml += `<tr>
                                                        <th scope="row">${index + 1}</th>
                                                        <td>${element.definition}</td>
                                                        <td>${element.example}</td>
                                                    </tr>`;
                            });
                        }
                        meaningHtmlMain += meaningHtml;
                    });
                }
                domResultHtml += resultHtml;
            });

            document.getElementById('resultAria').innerHTML = domResultHtml;
        }
        else if (xhr.status === 404) {
            document.getElementById('resultAria').innerHTML = 'Result nou found!';
        }
        else if(xhr.status === 304){
            document.getElementById('resultAria').innerHTML = 'Network Error Connection Closed';
        }
        else {
            document.getElementById('resultAria').innerHTML = 'Some error Occured'
        }
    }
    xhr.send();
}

function showResult() {
    document.querySelector('.resultBox').innerHTML = `<div class="card">
                                                        <div class="card-header bg-primary text-white text-center">
                                                            <h5>Result</h5>
                                                        </div>
                                                        <div class="card-body" id="resultAria"></div>
                                                      </div>`
}