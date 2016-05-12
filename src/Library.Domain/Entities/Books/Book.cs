using System.ComponentModel.DataAnnotations;

namespace Library.Domain.Entities.Books
{
    public class Book
    {
        [Required(ErrorMessage ="Title is required!")]
        [MaxLength(250,ErrorMessage = "Title max length is 250 characters!")]
        public string Title { get; set; }

        [Required(ErrorMessage = "ISBN is required!")]
        public string Isbn { get; set; }
    }
}
