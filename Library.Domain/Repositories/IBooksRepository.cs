using Library.Domain.Entities.Books;

namespace Library.Domain.Repositories
{
    public interface IBooksRepository
    {
        Book Get(string isbn);
        BookCollection GetAll();
    }
}
