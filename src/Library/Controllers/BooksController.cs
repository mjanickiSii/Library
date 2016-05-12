using Library.Domain.Repositories;
using Microsoft.AspNet.Mvc;

namespace Library.Controllers
{
    public class BooksController : Controller
    {
        IBooksRepository _booksRepository;
        public BooksController(IBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }
        public ActionResult Index()
        {
            return View(_booksRepository.GetAll());
        }

        public ActionResult Add()
        {
            return View();
        }

        public ActionResult GetAll()
        {
            return Json(_booksRepository.GetAll());
        }
    }
}