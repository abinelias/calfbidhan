using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ExpenseEntity
    {
        public int year { get; set; }
        public string month { get; set; }
        public int customerid { get; set; }
        public string expensetype { get; set; }
        public int quantity { get; set; }
        public decimal unitcost { get; set; }

    }

    public class ExpenseGridEntity
    {
        public int year { get; set; }
        public string month { get; set; }
        public int expenseid { get; set; }
        public string expensetype { get; set; }
        public int quantity { get; set; }
        public decimal unitcost { get; set; }

    }
}
