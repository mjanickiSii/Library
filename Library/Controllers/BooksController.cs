using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Library.Domain.Repositories;

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
    }
}