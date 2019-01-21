using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System;
using testeNoticias.Data;
using testeNoticias.Models;

namespace testeNoticias.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _appEnvironment;
        public NoticiaController(ApplicationDbContext context,IHostingEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }
        // GET: api/Noticia
        [HttpGet]
        public ActionResult<List<Noticia>> GetNoticias()
        {
            return _context.Noticias.OrderBy(x => x.Titulo).ToList();
        }

        // GET: api/Noticia/5
        [HttpGet("{id}")]
        public ActionResult<Noticia> GetNoticia(long id)
        {
            var noticia = _context.Noticias.Find(id);

            if (noticia == null)
            {
                return NotFound();
            }

            return noticia;
        }

        // POST: api/Noticia
        // [Authorize("Bearer")]
        [HttpPost]
        public ActionResult<Noticia> PostNoticia(Noticia noticia)
        {

            noticia.DataPublicacao = DateTime.Now;
            _context.Noticias.Add(noticia);
            _context.SaveChanges();

            return CreatedAtAction("GetNoticia", new { id = noticia.Id }, noticia);
            
        }

        // PUT: api/Noticia/5
        [HttpPut("{id}")]
        public ActionResult<Noticia> PutNoticia(long id, Noticia noticia)
        {
            if (id != noticia.Id)
            {
                return BadRequest();
            }           

            _context.Entry(noticia).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Noticia/5
        [HttpDelete("{id}")]
        public ActionResult<Noticia> DeleteNoticia(long id)
        {
            var noticia = _context.Noticias.Find(id);
            if (noticia == null)
            {
                return NotFound();
            }

            _context.Noticias.Remove(noticia);
            _context.SaveChanges();

            return noticia;
        }

    }
}
