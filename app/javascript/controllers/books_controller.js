import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["output"]



  searchBooks(element){
    let booksNames =[];
    let url = `http://openlibrary.org/search.json?q=${element}&fields=author_name,first_publish_year,title,cover_edition_key&limit=5`;
    fetch(url)
    .then((response) => response.json())
    .then((data)=>{
      booksNames = data.docs.map((x) => x.title)
      console.log("lista   " + booksNames);
      console.log(data);
    })

  }

  updateFilter(event){

    
    this.searchBooks(event.target.value);

  }


  connect() {
    //this.outputTarget.textContent = "Hello World!"
    
    
  }
}
