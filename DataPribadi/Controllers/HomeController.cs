using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using DataPribadi.Models;

namespace DataPribadi.Controllers
{
    public class HomeController : Controller
    {
        IdentitasDB idnDB = new IdentitasDB();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(idnDB.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(int nik, string nama)
        {
            var lst = idnDB.ListAll();
            var Identitas = new object();
            if (nik > 0 && string.IsNullOrWhiteSpace(nama))
            {
                Identitas = lst.Where(x => x.Nik == nik);// || x.NamaLengkap == nama);
                return Json(Identitas, JsonRequestBehavior.AllowGet);
            }
            else if (!string.IsNullOrWhiteSpace(nama) && nik == 0)
            {
                Identitas = lst.Where(x => x.NamaLengkap.ToLower() == nama.ToLower());
                return Json(Identitas, JsonRequestBehavior.AllowGet);
            }
            else if (nik > 0 && !string.IsNullOrWhiteSpace(nama))
            {
                Identitas = lst.Where(x => x.Nik == nik && x.NamaLengkap.ToLower() == nama.ToLower());
                return Json(Identitas, JsonRequestBehavior.AllowGet);
            }
            else {
                return Json(Identitas, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult Add(Identitas idn)
        {
            int insertedId = 0;
            int result = idnDB.Add(idn, out insertedId);

            // Return the inserted ID for further processing (if needed)
            return Json(new { Result = result, InsertedId = insertedId }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int Id)
        {
            var Identitas = idnDB.ListAll().Find(x => x.Id.Equals(Id));
            return Json(Identitas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Identitas idn)
        {
            return Json(new { Result = idnDB.Update(idn), UpdatedId = idn.Id }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(idnDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}
