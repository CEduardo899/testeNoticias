using System;

namespace testeNoticias.Models
{
    public class Noticia
    {
        public long Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string DescricaoCurta { get; set; }
        public DateTime DataPublicacao { get; set; }
        
        public string Img { get; set; }

        public int CategoriaId {get;set;}
        public virtual Categoria Categoria{get;set;}
    }
}