using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Repository;
namespace CalfScrambler.Models
{
    public class CustomerInfo
    {
        public customer cutomer { get; set; }
        public address address { get; set; }
        public List<animal> animals {get;set;}
    }
}