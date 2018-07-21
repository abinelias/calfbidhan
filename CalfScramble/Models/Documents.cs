using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Repository;
namespace CalfScrambler.Models
{
    public class Documents
    {
        public clfs_winner_info essay { get; set; }
        public List<clfs_winner_monthly_documents> monthly { get; set; }
    }
}