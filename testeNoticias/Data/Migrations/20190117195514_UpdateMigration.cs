using Microsoft.EntityFrameworkCore.Migrations;

namespace testeNoticias.Data.Migrations
{
    public partial class UpdateMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorias_Noticias_NoticiaId1",
                table: "Categorias");

            migrationBuilder.DropIndex(
                name: "IX_Categorias_NoticiaId1",
                table: "Categorias");

            migrationBuilder.DropColumn(
                name: "NoticiaId",
                table: "Categorias");

            migrationBuilder.DropColumn(
                name: "NoticiaId1",
                table: "Categorias");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Noticias",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "CategoriaId1",
                table: "Noticias",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Noticias_CategoriaId1",
                table: "Noticias",
                column: "CategoriaId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Noticias_Categorias_CategoriaId1",
                table: "Noticias",
                column: "CategoriaId1",
                principalTable: "Categorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Noticias_Categorias_CategoriaId1",
                table: "Noticias");

            migrationBuilder.DropIndex(
                name: "IX_Noticias_CategoriaId1",
                table: "Noticias");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Noticias");

            migrationBuilder.DropColumn(
                name: "CategoriaId1",
                table: "Noticias");

            migrationBuilder.AddColumn<int>(
                name: "NoticiaId",
                table: "Categorias",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "NoticiaId1",
                table: "Categorias",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Categorias_NoticiaId1",
                table: "Categorias",
                column: "NoticiaId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Categorias_Noticias_NoticiaId1",
                table: "Categorias",
                column: "NoticiaId1",
                principalTable: "Noticias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
