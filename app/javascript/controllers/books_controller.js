import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static targets = ["output"]

  
  searchBooks(event){

    let books;

    let element = event.target.value;

        $('<button/>').addClass('dropdown-item').attr('type', 'button').appendTo('#find-book');
            
        let url = `http://openlibrary.org/search.json?q=${element}&fields=author_name,first_publish_year,title,cover_edition_key&limit=5`;
        fetch(url)
        .then((response) => response.json())
        .then((data)=>{
          books = data.docs;

          let list = $('#find-book')
          list.empty()
          $.each(books, (i) => {
              const li = $('<li/>').appendTo(list);
              const text = $('<p class="mb-0"/>').text(`${books[i].title}`)
              const div = $('<div/>').append(text)
              $(`<p class="color-grey mb-0">${books[i].author_name}</>`).appendTo(div)
              const button = $('<button class="d-flex gap-2"/>')
              button.addClass('dropdown-item').attr('type', 'button')
                  .on('click', () => passBook(books[i])).appendTo(li)
                  .append(div);               
              
            });
        })
    }
}

function passBook(book) {
  $('#book_title').val(book.title)
  $('#book_author').val(book.author_name)
  $('#book_publication_year').val(book.first_publish_year)
  if(book.cover_edition_key == null){
    $('#book_cover_id').val('default_book.png')
  }else $('#book_cover_id').val(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`)
  
}

