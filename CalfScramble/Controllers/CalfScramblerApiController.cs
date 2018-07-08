using CalfScrambler.Models;
using Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;

namespace CalfScramble.Controllers
{
    public class CalfScramblerApiController : ApiController
    {
        private RepositoryCalfScrample db;
        public CalfScramblerApiController()
        {
            db = new RepositoryCalfScrample();
        }
        ////  [Route("api/student/names")]

        /// [Route("GetCustomerId")]
        [ActionName("GetCustomerId")]
        [HttpGet]
        public CustomerInfo GetCustomerId(int id)
        {
            return new CustomerInfo
            {
                cutomer = db.GetCustomerById(id),
                address = db.GetAddressById(id),
                animals = db.GetAnimalsById(id)

            };
        }

        [ActionName("saveCustomer")]
        [HttpPost]
        public bool saveCustomer([FromBody] CustomerInfo data)
        {
            return db.UpdateCustomer(data.cutomer,data.address);
        }

        [ActionName("UploadTest")]
        [HttpPost]
        public bool UploadTest()
        {
            var year = Convert.ToInt32(HttpContext.Current.Request.Params["year"]);
            var cuid = Convert.ToInt32(HttpContext.Current.Request.Params["cuid"]);
            var month = HttpContext.Current.Request.Params["month"];
            var type = HttpContext.Current.Request.Params["type"];

            var httpPostedFile = HttpContext.Current.Request.Files["filesample"];
            db.saveFile(month, year, type, cuid, httpPostedFile);
            return true;
        }

        [ActionName("UploadEssay")]
        [HttpPost]
        public bool UploadEssay()
        {
            var year = Convert.ToInt32(HttpContext.Current.Request.Params["year"]);
            var cuid = Convert.ToInt32(HttpContext.Current.Request.Params["cuid"]);
            var month = HttpContext.Current.Request.Params["month"];
            var type = HttpContext.Current.Request.Params["type"];

            var httpPostedFile = HttpContext.Current.Request.Files["filesample"];
            db.saveEssayFile(month, year, type, cuid, httpPostedFile);
            return true;
        }

        [ActionName("GetEssayFileData")]
        [HttpGet]
        public HttpResponseMessage GetEssayFileData(int id, string month, int year, string type)
        {
            var file = db.GetAttachmentByHeaderId(id, month, year);
            MemoryStream dataStream = null;
            string fileNmae = string.Empty;
            if (type == "initass")
            {
                dataStream = new MemoryStream(file.CORRESPONDENCE);
                fileNmae = file.CORR_FILE_NAME;
            }
            else if (type == "finass")
            {
                dataStream = new MemoryStream(file.PHOTO);
                fileNmae = file.PHOTO_FILE_NAME;

            }
            else if (type == "monledger")
            {
                dataStream = new MemoryStream(file.PHOTO);
                fileNmae = file.PHOTO_FILE_NAME;

            }
            else if (type == "breedessay")
            {
                dataStream = new MemoryStream(file.PHOTO);
                fileNmae = file.PHOTO_FILE_NAME;

            }
            else if (type == "yearendessay")
            {
                dataStream = new MemoryStream(file.PHOTO);
                fileNmae = file.PHOTO_FILE_NAME;

            }

            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(dataStream);
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileNmae;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return httpResponseMessage;
        }

        [ActionName("GetFileData")]
        [HttpGet]
        public HttpResponseMessage GetFileData(int id, string month, int year, string type)
        {
            var file = db.GetAttachmentByHeaderId(id, month, year);
            MemoryStream dataStream = null;
            string fileNmae = string.Empty;
            if (type == "corres")
            {
                dataStream = new MemoryStream(file.CORRESPONDENCE);
                fileNmae = file.CORR_FILE_NAME;
            }
            else if (type == "photo1")
            {
                dataStream = new MemoryStream(file.PHOTO);
                fileNmae = file.PHOTO_FILE_NAME;

            }

            HttpResponseMessage httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(dataStream);
            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileNmae;
            httpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return httpResponseMessage;
        }

        ////  [Route("GetCurrentMonth")]
        [ActionName("GetCurrentMonth")]
        [HttpGet]
        public string GetCurrentMonth()
        {
            string month = WebConfigurationManager.AppSettings["Month"];
            return month;
        }

        [ActionName("GetCurrentYear")]
        [HttpGet]
        public string GetCurrentYear()
        {
            string year = WebConfigurationManager.AppSettings["Year"];
            return year;
        }
        [ActionName("SaveAnimal")]
        [HttpPost]
        public bool SaveAnimal(animal animal)
        {
            db.SaveAnimal(animal);
            return true;
        }

        [ActionName("GetAnimals")]
        [HttpGet]
        public List<animal> GetAnimals(int cuid)
        {
            return db.GetAnimals(cuid);
        }

        [ActionName("GetExpenseByYear")]
        [HttpGet]
        public IReadOnlyList<ExpenseGridEntity> GetExpenseByYear(int year, int customerid)
        {
            return db.GetExpenseByYear(year, customerid);
        }

        [ActionName("AddExpense")]
        [HttpPost]
        public bool AddExpense([FromBody]ExpenseEntity e)
        {
            return db.AddExpense(e);
        }

        [ActionName("DeleteExpense")]
        [HttpGet]
        public bool DeleteExpense(int id)
        {
            return db.DeleteExpense(id);
        }
    }
}