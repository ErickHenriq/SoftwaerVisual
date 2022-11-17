using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
﻿
namespace trabalho
{
    class terno{

        public int Id { get ; set; }

        public string? Modelo { get ; set; }

        public string? Cor { get ; set; }

        public string? Tamanho { get ; set; }

        public string? Status { get ; set; }

}



// LOCADOR ----------------------------------------------------------------------------------------

class locador{

        public int Id { get ; set; }

        public string? Nome { get ; set; }

        public string? Cpf { get ; set; }

    }


// LOCACAO ----------------------------------------------------------------------------------------



class Locacao{

        public int Id { get ; set; }

		public int IdTerno { get ; set; }

		public int IdLocador { get ; set; }
		
		public string? Status { get ; set; }

		public DateTime DatadeEntrega;

    }





  class Locadora : DbContext{

        public Locadora (DbContextOptions options) : base(options){}

        public DbSet<terno> ternos { get; set; } = null!;
        public DbSet<locador> locadores { get; set; } = null!;
        public DbSet<Locacao> locacoes { get; set; } = null!;
}

    
   //-----------------------------------------------------------------------------------------------------

    class Program

    {

        static void Main(string[] args)

        {

			//database
			var builder = WebApplication.CreateBuilder(args);
			builder.Services.AddSqlite<Locadora>(builder.Configuration.GetConnectionString("Locadora") ?? "Data Source=Locadora.db");
			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

			//var connectionString = builder.Configuration.GetConnectionString("Locadora") ?? "Data Source=Locadora.db";
			//builder.Services.AddSqlite<Locadora>(connectionString);

			var app = builder.Build();
			app.UseCors();

            

// Funçoes TERNO -------------------------------------------------------------------------------------------------------------

            

            //listar todos os ternos

			app.MapGet("/ternos", (Locadora baseternos) => {

				return baseternos.ternos.ToList();

			});


			//listar só 1 terno por id
			app.MapGet("/terno/listar/{id}", (Locadora baseternos, int id) =>

			{

				var terno = baseternos.ternos.Find(id);

                
				return terno;

			});

			

            //cadastrar um novo terno

			app.MapPost("/terno/cadastrar", (Locadora baseternos, terno terno) =>


			{
				terno.Status = "Disponivel";
				
				baseternos.ternos.Add(terno);

				baseternos.SaveChanges();

				return "Terno adicionado";

			});



            //atualizar um terno

			app.MapPut("/terno/atualizar/{id}", (Locadora baseternos, terno ternoAtualizado, int id) =>

			{

				var terno = baseternos.ternos.Find(id);

				if(terno == null){
					return Results.NotFound();
				}

				if(null != ternoAtualizado.Modelo)         terno.Modelo         = ternoAtualizado.Modelo;
				if(null != ternoAtualizado.Cor)            terno.Cor            = ternoAtualizado.Cor;
				if(null != ternoAtualizado.Tamanho)        terno.Tamanho        = ternoAtualizado.Tamanho;
				if(null != ternoAtualizado.Status)         terno.Status         = ternoAtualizado.Status;
				baseternos.SaveChanges();
				return Results.Ok();

                //terno.Modelo = ternoAtualizado.Modelo;

                //terno.Cor = ternoAtualizado.Cor;

				//baseternos.SaveChanges();

				//return "Terno atualizado";

			});



            //deletar um terno

			app.MapDelete("/terno/deletar/{id}", (Locadora baseternos, int id) =>

			{

				var terno = baseternos.ternos.Find(id);
				if(terno == null){
					return Results.NotFound();
				}


				baseternos.Remove(terno);
				baseternos.SaveChanges();
				return Results.Ok();

				//return "Terno removido";

			});



//LOCADOR -------------------------------------------------------------------------------------------------------------      

            //listar todos os locadores

			app.MapGet("/locador", (Locadora baselocadores) => {

				return baselocadores.locadores.ToList();

			});

			//listar só 1 Locador por id
			app.MapGet("/locador/listar/{id}", (Locadora baselocadores, int id) =>

			{

				var locador = baselocadores.locadores.Find(id);

                
				return locador;

			});




            //cadastrar um novo locadores

			app.MapPost("/locador/cadastrar", (Locadora baselocadores, locador novoLocador) =>

			{

				baselocadores.locadores.Add(novoLocador);

				baselocadores.SaveChanges();

				return "Locador adicionado";

			});



            //atualizar um locadores

			app.MapPut("/locador/atualizar/{id}", (Locadora baselocadores, locador locadorAtualizado, int id) =>

			{

				var locador = baselocadores.locadores.Find(id);

				if(locador == null){
					return Results.NotFound();
				}

				if(null != locadorAtualizado.Cpf)         locador.Cpf         = locadorAtualizado.Cpf;
				if(null != locadorAtualizado.Nome)        locador.Nome        = locadorAtualizado.Nome;
				baselocadores.SaveChanges();
				return Results.Ok();


			});



            //deletar um locadores

			app.MapDelete("/locador/deletar/{id}", (Locadora baselocadores, int id) =>
			{
				var locador = baselocadores.locadores.Find(id);
				if(locador == null){
					return Results.NotFound();
				}


				baselocadores.Remove(locador);
				baselocadores.SaveChanges();
				return Results.Ok();
				/*
				var locador = baselocadores.locadores.Find(id);

				baselocadores.Remove(locador);

				baselocadores.SaveChanges();

				return "Locador removido";
*/
			});



//LOCAÇAO -------------------------------------------------------------------------------------------------------------------



            //listar todos os Locação

			app.MapGet("/locacao", (Locadora baselocacao) => {

				return baselocacao.locacoes.ToList();

			});

			//listar só 1 Locador por id
			app.MapGet("/locacao/listar/{id}", (Locadora baselocacao, int id) =>

			{

				var locacao = baselocacao.locacoes.Find(id);

                
				return locacao;

			});

			



            //cadastrar um novo Locação

			
			app.MapPost("/locacao/cadastrar", (Locadora baselocacao, Locacao novoLocacao) =>

			{

				novoLocacao.DatadeEntrega = new DateTime().AddDays(15);
				novoLocacao.Status = "Disponivel";
				baselocacao.locacoes.Add(novoLocacao);
				baselocacao.SaveChanges();

				return "Locação adicionado";


			});



            //atualizar um Locação
			app.MapPut("/locacao/atualizar/{id}", (Locadora baselocacao, Locacao locacaoAtualizada, int id) =>

			{

				var locacao = baselocacao.locacoes.Find(id);

				if(locacao == null){
					return Results.NotFound();
				}

				if(null != locacaoAtualizada.IdLocador)         locacao.IdLocador         = locacaoAtualizada.IdLocador;
				if(null != locacaoAtualizada.IdTerno)           locacao.IdTerno           = locacaoAtualizada.IdTerno;
				baselocacao.SaveChanges();
				return Results.Ok();

			});



            //deletar um Locação

			app.MapDelete("/locacao/deletar/{id}", (Locadora baselocacao, int id) =>

			{
				var locacao = baselocacao.locacoes.Find(id);
				if(locacao == null){
					return Results.NotFound();
				}


				baselocacao.Remove(locacao);
				baselocacao.SaveChanges();
				return Results.Ok();
			});



            app.Run("http://localhost:3000");

        }

    } 

}



