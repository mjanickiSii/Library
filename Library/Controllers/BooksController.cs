﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.Controllers
{
    public class BooksController : Controller
    {
        // GET: Book
        public ActionResult Add()
        {
            return View();
        }
    }
}