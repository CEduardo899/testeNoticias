using System.Collections.Generic;

namespace testeNoticias.Models
{
    public class Categoria
    {
        public Categoria()
        {
            Noticias = new HashSet<Noticia>();
        }
        public long Id { get; set; }
        public string Nome { get; set; }
        public virtual ICollection<Noticia> Noticias {get;set;}
    }
}