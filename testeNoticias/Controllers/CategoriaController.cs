using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Linq;
using testeNoticias.Data;
using testeNoticias.Models;
namespace testeNoticias.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoriaController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/Categoria
        [HttpGet]
        public ActionResult<List<Categoria>> GetCategorias()
        {
            return _context.Categorias.OrderBy(x => x.Nome).ToList();
        }

        // GET: api/Categoria/5
        [HttpGet("{id}")]
        public ActionResult<Categoria> GetCategoria(long id)
        {
            var categoria = _context.Categorias.Find(id);

            if (categoria == null)
            {
                return NotFound();
            }

            return categoria;
        }

        // POST: api/Categoria
        [HttpPost]
        public ActionResult<Categoria> PostCategoria(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();

            return CreatedAtAction("GetCategoria", new { id = categoria.Id }, categoria);
        }

        // PUT: api/Categoria/5
        [HttpPut("{id}")]
        public ActionResult<Categoria> PutCategoria(long id, Categoria categoria)
        {
            if (id != categoria.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoria).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Categoria/5
        [HttpDelete("{id}")]
        public ActionResult<Categoria> DeleteCategoria(long id)
        {
            var categoria = _context.Categorias.Find(id);
            if (categoria == null)
            {
                return NotFound();
            }

            _context.Categorias.Remove(categoria);
            _context.SaveChanges();

            return categoria;
        }

    }
}
