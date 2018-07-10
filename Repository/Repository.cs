using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Repository
{
    public class RepositoryCalfScrample
    {
        public RepositoryCalfScrample()
        {
        }
        public customer GetCustomerById(int id)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                return cs.customers.Where(x => x.CUSTOMER_ID == id).FirstOrDefault();
            }
        }

        public address GetAddressById(int id)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                return cs.addresses.Where(x => x.CUSTOMER_ID == id).FirstOrDefault();
            }
        }
        public animal GetAnimalsById(int id)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                var l = cs.animals.Where(x => x.CUSTOMER_ID == id).ToList();
                return l.Any()?l.FirstOrDefault():new animal { ANIMAL_ID = 0 };
            }
        }

        public bool AddExpense(ExpenseEntity e)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                var header = cs.clfs_winner_monthly_headers.Where(x => x.EXHIBITOR_ID == e.customerid && x.REPORTING_MONTH == e.month && x.SHOW_YEAR == e.year).FirstOrDefault();
                if (header == null)
                {
                    header = new clfs_winner_monthly_headers { EXHIBITOR_ID = e.customerid, REPORTING_MONTH = e.month, SHOW_YEAR = e.year };
                    cs.clfs_winner_monthly_headers.Add(header);
                    cs.SaveChanges();
                }
                cs.clfs_winner_monthly_expenses.Add(new clfs_winner_monthly_expenses { HEADER_ID = header.HEADER_ID, EXPENSE_TYPE = e.expensetype, QUANTITY = e.quantity, UNIT_COST = e.unitcost });
                cs.SaveChanges();
                return true;
            }
        }

        public IReadOnlyList<ExpenseGridEntity> GetExpenseByYear(int year, int customerid)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                var list = new List<ExpenseGridEntity>();
                var header = cs.clfs_winner_monthly_headers.Where(x => x.EXHIBITOR_ID == customerid && x.SHOW_YEAR == year);
                if (header != null)
                {
                    foreach (var headerInfo in header)
                    {
                        foreach (var r in cs.clfs_winner_monthly_expenses.Where(x => x.HEADER_ID == headerInfo.HEADER_ID))
                        {
                            list.Add(new ExpenseGridEntity { expenseid = r.LINE_ID, expensetype = r.EXPENSE_TYPE, month = headerInfo.REPORTING_MONTH, quantity = (int)r.QUANTITY, unitcost = (decimal)r.UNIT_COST, year = year });
                        }
                    }

                }

                return list;
            }
        }

        public bool DeleteExpense(int id)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                cs.clfs_winner_monthly_expenses.RemoveRange(cs.clfs_winner_monthly_expenses.Where(x => x.LINE_ID == id));
                cs.SaveChanges();
                return true;
            }
        }

        public void saveFile(string month, int year, string type, int customerId, HttpPostedFile files)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {

                var header = cs.clfs_winner_monthly_headers.Where(x => x.EXHIBITOR_ID == customerId && x.REPORTING_MONTH == month && x.SHOW_YEAR == year).FirstOrDefault();
                if (header == null)
                {
                    header = new clfs_winner_monthly_headers { EXHIBITOR_ID = customerId, REPORTING_MONTH = month, SHOW_YEAR = year };
                    cs.clfs_winner_monthly_headers.Add(header);
                    cs.SaveChanges();
                }

                Stream stream = files.InputStream;
                BinaryReader reader = new BinaryReader(stream);
                byte[] imgByte = reader.ReadBytes((int)stream.Length);
                var file = cs.clfs_winner_monthly_documents.Where(x => x.HEADER_ID == header.HEADER_ID&&x.COMMENTS==type).FirstOrDefault();
                if (file == null)
                {
                    switch (type)
                    {
                        case "corres":
                            cs.clfs_winner_monthly_documents.Add(new clfs_winner_monthly_documents {COMMENTS=type, HEADER_ID = header.HEADER_ID, CORRESPONDENCE = imgByte, CORR_FILE_NAME = files.FileName, CORR_FILE_TYPE = files.ContentType, CORR_SUBMIT_DATE = DateTime.Now });
                            break;
                        case "photo1":
                        case "photo2":
                        case "photo3":
                            cs.clfs_winner_monthly_documents.Add(new clfs_winner_monthly_documents { COMMENTS = type, HEADER_ID = header.HEADER_ID, PHOTO = imgByte, PHOTO_FILE_NAME = files.FileName, PHOTO_FILE_TYPE = files.ContentType, PHOTO_SUBMIT_DATE = DateTime.Now });
                            break;

                    }
                }
                else
                {
                    switch (type)
                    {
                        case "corres":

                            file.CORRESPONDENCE = imgByte;
                            file.CORR_FILE_TYPE = files.ContentType;
                            file.CORR_FILE_NAME = files.FileName;
                            break;
                        case "photo1":

                            file.PHOTO = imgByte;
                            file.PHOTO_FILE_TYPE = files.ContentType;
                            file.PHOTO_FILE_NAME = files.FileName;
                            break;
                    }
                    
                }
                cs.SaveChanges();
            }
        }

        public void saveEssayFile(string month, int year, string type, int customerId, HttpPostedFile files)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {

                var winner_info = cs.clfs_winner_info.Where(x => x.EXHIBITOR_ID == customerId && x.SHOW_YEAR == year).FirstOrDefault();
                if (winner_info == null)
                {
                    var header = new clfs_winner_info { EXHIBITOR_ID = customerId, SHOW_YEAR = year, EXHIBITOR_NAME = "", EXHIBITOR_NUMBER = "", DONOR_NAME = "", DONOR_NUMBER = "" };
                    cs.clfs_winner_info.Add(header);
                    cs.SaveChanges();
                }
                /////////winner_info = cs.clfs_winner_info.Where(x => x.EXHIBITOR_ID == customerId && x.SHOW_YEAR == year).FirstOrDefault();

                Stream stream = files.InputStream;
                BinaryReader reader = new BinaryReader(stream);
                byte[] imgByte = reader.ReadBytes((int)stream.Length);
                var file = cs.clfs_winner_info.Where(x => x.EXHIBITOR_ID == customerId && x.SHOW_YEAR == year).FirstOrDefault();
                if (file != null)
                {
                    switch (type)
                    {
                        case "initass":
                            ///file.ASSESSMENT_INIT = files.FileName;
                            file.ASSESSMENT_INIT_BLOB = imgByte;
                            file.ASSESSMENT_INIT_FILE_NAME = files.FileName;
                            file.ASSESSMENT_INIT_FILE_TYPE = files.ContentType;
                            file.ASSESSMENT_INIT_SUBMIT_DATE = DateTime.Now;
                            break;

                        case "finass":
                            //// file.ASSESSMENT_FINAL = files.FileName;
                            file.ASSESSMENT_FINAL_BLOB = imgByte;
                            file.ASSESSMENT_FINAL_FILE_NAME = files.FileName;
                            file.ASSESSMENT_FINAL_FILE_TYPE = files.ContentType;
                            file.ASSESSMENT_FINAL_SUBMIT_DATE = DateTime.Now;
                            break;

                        case "monledger":
                            file.LEDGER_MONTH_BLOB = imgByte;
                            file.LEDGER_MONTH_FILE_NAME = files.FileName;
                            file.LEDGER_MONTH_FILE_TYPE = files.ContentType;
                            file.LEDGER_MONTH_SUBMIT_DATE = DateTime.Now;
                            break;
                        case "breedessay":
                            // file.BREED_ESSAY = files.FileName;
                            file.BREED_RPT_BLOB = imgByte;
                            file.BREED_FILE_NAME = files.FileName;
                            file.BREED_FILE_TYPE = files.ContentType;
                            file.BREED_RPT_SUBMIT_DATE = DateTime.Now;
                            break;

                        case "yearendessay":
                            // file.YEAR_END_ESSAY = files.FileName;
                            file.YEAR_END_RPT_BLOB = imgByte;
                            file.YREND_FILE_NAME = files.FileName;
                            file.YREND_FILE_TYPE = files.ContentType;
                            file.YREND_RPT_SUBMIT_DATE = DateTime.Now;
                            break;



                    }
                }
                cs.SaveChanges();
            }
        }
        public clfs_winner_monthly_documents GetAttachmentByHeaderId(int id, string month, int year,string type)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                var header = cs.clfs_winner_monthly_headers.Where(x => x.EXHIBITOR_ID == id && x.REPORTING_MONTH == month && x.SHOW_YEAR == year).FirstOrDefault();

                return cs.clfs_winner_monthly_documents.Where(x => x.HEADER_ID == header.HEADER_ID&& x.COMMENTS== type).FirstOrDefault();
            }
        }

        public clfs_winner_info GetEssayFile(int id, string month, int year)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                return cs.clfs_winner_info.Where(x => x.EXHIBITOR_ID == id && x.SHOW_YEAR == year).FirstOrDefault();
            }
        }

        public void SaveAnimal(animal animal)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                cs.animals.Add(animal);
            }
        }

        public List<animal> GetAnimals(int cuid)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                return cs.animals.Where(x => x.CUSTOMER_ID == cuid).ToList();
            }
        }
        public bool UpdateCustomer(customer cu, address addr,animal an)
        {
            using (CalfScramblerEntities cs = new CalfScramblerEntities())
            {
                var cust=cs.customers.Where(x => x.CUSTOMER_ID == cu.CUSTOMER_ID).FirstOrDefault();
                cust.CUSTOMER_NUMBER = cu.CUSTOMER_NUMBER;
                cust.FIRST_NAME = cu.FIRST_NAME;
                cust.LAST_NAME = cu.LAST_NAME;
                cust.LAST_UPDATE_DATE = DateTime.Now;
                var address = cs.addresses.Where(x => x.ADDRESS_ID == addr.ADDRESS_ID).FirstOrDefault();
                address.CITY = addr.CITY;
                address.COUNTRY = addr.COUNTRY;
                address.CREATED_BY = addr.CREATED_BY;
                address.CREATION_DATE = addr.CREATION_DATE;
                address.EMAIL = addr.EMAIL;
                address.EMAIL_SECOND = addr.EMAIL_SECOND;
                address.PHONE = addr.PHONE;
                address.POSTAL = addr.POSTAL;
                address.STATE = addr.STATE;
                address.STATUS = addr.STATUS;
                if (an.ANIMAL_ID == 0)
                {
                    cs.animals.Add(an);
                }
                cs.SaveChanges();
                return true;
            }
        }
    }
}
