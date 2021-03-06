﻿using CalfScrambler.Models;
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
                animal = db.GetAnimalsById(id)

            };
        }

        [ActionName("saveCustomer")]
        [HttpPost]
        public bool saveCustomer([FromBody] CustomerInfo data)
        {
            return db.UpdateCustomer(data.cutomer, data.address, data.animal);
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
            var file = db.GetEssayFile(id, month, year);
            MemoryStream dataStream = null;
            string fileNmae = string.Empty;
            if (type == "initass")
            {
                dataStream = new MemoryStream(file.ASSESSMENT_INIT_BLOB);
                fileNmae = file.ASSESSMENT_INIT_FILE_NAME;
            }
            else if (type == "finass")
            {
                dataStream = new MemoryStream(file.ASSESSMENT_FINAL_BLOB);
                fileNmae = file.ASSESSMENT_FINAL_FILE_NAME;

            }
            else if (type == "monledger")
            {
                dataStream = new MemoryStream(file.LEDGER_MONTH_BLOB);
                fileNmae = file.LEDGER_MONTH_FILE_NAME;

            }
            else if (type == "breedessay")
            {
                dataStream = new MemoryStream(file.BREED_RPT_BLOB);
                fileNmae = file.BREED_FILE_NAME;

            }
            else if (type == "yearendessay")
            {
                dataStream = new MemoryStream(file.YEAR_END_RPT_BLOB);
                fileNmae = file.YEAR_END_REPORT;

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
            var file = db.GetAttachmentByHeaderId(id, month, year, type);
            MemoryStream dataStream = null;
            string fileNmae = string.Empty;
            if (type == "corres")
            {
                dataStream = new MemoryStream(file.CORRESPONDENCE);
                fileNmae = file.CORR_FILE_NAME;
            }
            else if (type.StartsWith("photo", StringComparison.CurrentCultureIgnoreCase))
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
            //string month = WebConfigurationManager.AppSettings["Month"];
            return ReportingMonth();
        }

        [ActionName("GetCurrentYear")]
        [HttpGet]
        public string GetCurrentYear()
        {
            string year = WebConfigurationManager.AppSettings["Year"];
            return year;
        }

        [ActionName("GetDeadLineDate")]
        [HttpGet]
        public string GetDeadLineDate()
        {
            string date = WebConfigurationManager.AppSettings["Deadline"];
            return date;
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
        [ActionName("GetAllAttachmentByHeaderId")]
        [HttpGet]
        public IReadOnlyList<clfs_winner_monthly_documents> GetAllAttachmentByHeaderId(int id, string month, int year)
        {
            return db.GetAllAttachmentByHeaderId(id, month, year);
        }
        [ActionName("DeleteDocById")]
        [HttpGet]
        public bool DeleteDocById(int id)
        {
            return db.DeleteDocById(id);
        }
        [ActionName("DeleteEssayByType")]
        [HttpGet]
        public bool DeleteEssayByType(int id, string type)
        {
            return db.DeleteEssay(id, type);
        }

        [ActionName("GetEssayFileFullData")]
        [HttpGet]
        public clfs_winner_info GetEssayFileFullData(int id, string month, int year)
        {
            return db.GetEssayFile(id, month, year);
        }

        [ActionName("GetAllDocs")]
        [HttpGet]
        public Documents GetAllDocs(int id, string month, int year)
        {
            return new Documents { essay = db.GetEssayFile(id, month, year), monthly = db.GetAllAttachmentByHeaderId(id, month, year) };


        }

        public Int32 ReportingMonthNumber()
        {
            //<add key="MonthlyReportingDate" value="11" />
            //Would provide such as for May = 5
            try
            {
                string reportMonthNum = System.Configuration.ConfigurationManager.AppSettings["MonthlyReportingDate"].ToString();
                Int32 returnMonth = 0;

                if (DateTime.Now.Day >= 1 && DateTime.Now.Day < Convert.ToInt32(reportMonthNum))
                {
                    returnMonth = DateTime.Now.AddMonths(-1).Month;
                }
                else
                {
                    returnMonth = DateTime.Now.Month;
                }
                return returnMonth;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        //DateTime dtDate = new DateTime(2000, iMonthNo, 1);
        //string sMonthName = dtDate.ToString("MMM");
        //string sMonthFullName = dtDate.ToString("MMMM");

        public string ReportingMonth()
        {
            string reportMonth = "";
            Int32 showYear = 2018;

            //Would provide MAY for ReportingMonthNumber() = 5
            try
            {
                DateTime dtDate = new DateTime(showYear, ReportingMonthNumber(), DateTime.Now.Day);
                reportMonth = dtDate.ToString("MMMM").ToUpper();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return reportMonth;
        }

        public string NextReportingMonth()
        {
            string reportMonth = "";
            Int32 showYear = 2018;
            try
            {
                DateTime dtDate = new DateTime(showYear, ReportingMonthNumber() + 1, DateTime.Now.Day);
                reportMonth = dtDate.ToString("MMMM").ToUpper();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return reportMonth;
        }

        //Me.lblReportingCycle.Text = "Reporting Cycle:  Enter from " & 
        //My.Application.Engine.ReportingMonthFullDate.ToString("MMMM dd") & " to " 
        // & My.Application.Engine.NextReportingMonthFullDate.ToString("MMMM dd")

        //Reporting Cycle: Enter from May 11 to June 10

        //DateTime dtDate = new DateTime(2000, iMonthNo, 1);
        //string sMonthName = dtDate.ToString("MMM");
        //string sMonthFullName = dtDate.ToString("MMMM");

        //ReportingMonthFullDate
        public string BeginReportingMonth()
        {
            string rptCycle = "";
            Int32 showYear = 2018;
            string repMonthDay = System.Configuration.ConfigurationManager.AppSettings["MonthlyReportingDate"].ToString();
            try
            {
                DateTime dtDate = new DateTime(showYear, ReportingMonthNumber(), Convert.ToInt32(repMonthDay));
                rptCycle = dtDate.ToString("MMMM dd");

                return rptCycle;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }


        //Would provide June 10
        public string EndReportingMonth()
        {
            string rptCycle = "";
            Int32 showYear = 2018;
            string repMonthDay = System.Configuration.ConfigurationManager.AppSettings["MonthlyReportingDate"].ToString();
            try
            {
                DateTime dtDate = new DateTime(showYear, ReportingMonthNumber() + 1, (Convert.ToInt32(repMonthDay) - 1));
                rptCycle = dtDate.ToString("MMMM dd");

                return rptCycle;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

    }
}