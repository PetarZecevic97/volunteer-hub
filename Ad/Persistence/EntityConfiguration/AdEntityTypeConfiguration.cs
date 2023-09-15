using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ads.Entities;

namespace Ads.Persistence.EntityConfiguration
{
	public class AdEntityTypeConfiguration : IEntityTypeConfiguration<AdEntity>
    {
        public void Configure(EntityTypeBuilder<AdEntity> builder)
        {
            builder.ToTable("Ads");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).ValueGeneratedOnAdd();

            builder.Property<string>("Title")
                .HasColumnType("VARCHAR(100)")
                .HasColumnName("title");

            builder.Property<string>("Summary")
                .HasColumnType("VARCHAR(7000)")
                .HasColumnName("summary");

            builder.Property<string>("Skills")
                .HasColumnType("VARCHAR(1000)")
                .HasColumnName("skills");

            builder.Property<bool>("IsOpen")
                .HasColumnType("BIT")
                .HasColumnName("is_open");

            builder.Property<bool>("IsEmergency")
                .HasColumnType("BIT")
                .HasColumnName("is_emergency");

            builder.Property<string>("OrganizationId")
                .HasColumnType("VARCHAR(1000)")
                .HasColumnName("organization_id");

            builder.Property<string>("Location")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("location")
                .IsRequired();

            builder.Property<DateTime>("OpenedDate")
                .HasColumnType("datetime")
                .HasColumnName("opened_date");

            builder.Property<DateTime>("LastModifiedDate")
                .HasColumnType("datetime")
                .HasColumnName("last_modified_date");

        }
	}
}

