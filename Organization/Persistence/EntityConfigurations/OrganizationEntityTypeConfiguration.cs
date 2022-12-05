using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using Organization.Entities;

namespace Organization.Persistence.EntityConfigurations
{
    public class OrganizationEntityTypeConfiguration : IEntityTypeConfiguration<OrganizationEntity>
    {
        public void Configure(EntityTypeBuilder<OrganizationEntity> builder)
        {
            builder.ToTable("Organization");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).UseHiLo("organizationseq");

            builder.Property<string>("OrganizationId")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("organization_id");

            builder.Property<string>("OrganizationName")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("organization_name")
                .IsRequired();

            builder.Property<string>("Summary")
                .HasColumnType("VARCHAR(100)")
                .HasColumnName("summary");

            builder.Property<DateTime>("CreatedDate")
                .HasColumnType("datetime")
                .HasColumnName("created_date");
                            
            builder.Property<string>("CreatedBy")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("created_by");

            builder.Property<DateTime>("LastModifiedDate")
                .HasColumnType("datetime")
                .HasColumnName("last_modified_date");

            builder.Property<string>("LastModifiedBy")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("last_Modified_by");

        }
    }
}
