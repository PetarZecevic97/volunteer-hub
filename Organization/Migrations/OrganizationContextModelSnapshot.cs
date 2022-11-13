﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Organization.Persistence;

namespace Organization.Migrations
{
    [DbContext(typeof(OrganizationContext))]
    partial class OrganizationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.HasSequence("organizationseq")
                .IncrementsBy(10);

            modelBuilder.Entity("Organization.Entities.OrganizationEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:HiLoSequenceName", "organizationseq")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.SequenceHiLo);

                    b.Property<string>("CreatedBy")
                        .HasColumnType("VARCHAR(30)")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime")
                        .HasColumnName("created_date");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("VARCHAR(30)")
                        .HasColumnName("last_Modified_by");

                    b.Property<DateTime>("LastModifiedDate")
                        .HasColumnType("datetime")
                        .HasColumnName("last_modified_date");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("VARCHAR(30)")
                        .HasColumnName("organization_id");

                    b.Property<string>("OrganizationName")
                        .IsRequired()
                        .HasColumnType("VARCHAR(30)")
                        .HasColumnName("organization_name");

                    b.Property<string>("Summary")
                        .HasColumnType("VARCHAR(100)")
                        .HasColumnName("summary");

                    b.HasKey("Id");

                    b.ToTable("Organization");
                });
#pragma warning restore 612, 618
        }
    }
}