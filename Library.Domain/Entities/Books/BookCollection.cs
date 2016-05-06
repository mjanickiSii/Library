using System.Collections.Concurrent;

namespace Library.Domain.Entities.Books
{
    public class BookCollection:ConcurrentBag<Book>
    {

    }
}
