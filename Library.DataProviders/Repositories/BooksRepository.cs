using System;
using Library.Domain.Entities.Books;
using Library.Domain.Repositories;

namespace Library.DataProviders.Repositories
{
    public class BooksRepository : IBooksRepository
    {
        public Book Get(string isbn)
        {
            return new Book { Isbn = "1234", Title = "1234" };
        }

        public BookCollection GetAll()
        {
            return new BookCollection {
                new Book { Isbn="1234",Title="1234"},
                new Book { Isbn="5678",Title="5678"},
                new Book { Isbn="1574",Title="1574"},
                new Book { Isbn="3825",Title="3825"},
                new Book { Isbn="6387",Title="6387"},
                new Book { Isbn="3945",Title="3945"},
                new Book { Isbn="7458",Title="7458"}
            };
        }
    }
}
