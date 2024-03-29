﻿// <auto-generated />
using System;
using Ads.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Ad.Migrations
{
    [DbContext(typeof(AdContext))]
    [Migration("20230731092048_location")]
    partial class location
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Ads.Entities.AdEntity", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsOpen")
                        .HasColumnType("BIT")
                        .HasColumnName("is_open");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime")
                        .HasColumnName("last_modified_date");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("VARCHAR(30)")
                        .HasColumnName("location");

                    b.Property<DateTime>("OpenedDate")
                        .HasColumnType("datetime")
                        .HasColumnName("opened_date");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("VARCHAR(1000)")
                        .HasColumnName("organization_id");

                    b.Property<string>("Skills")
                        .HasColumnType("VARCHAR(1000)")
                        .HasColumnName("skills");

                    b.Property<string>("Summary")
                        .HasColumnType("VARCHAR(7000)")
                        .HasColumnName("summary");

                    b.Property<string>("Title")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.ToTable("Ads");
                });
#pragma warning restore 612, 618
        }
    }
}
