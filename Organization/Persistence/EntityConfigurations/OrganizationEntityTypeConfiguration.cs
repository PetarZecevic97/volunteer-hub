using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Organization.Persistence.EntityConfigurations
{
    public class OrganizationEntityTypeConfiguration : IEntityTypeConfiguration<Entities.Organization>
    {
        public void Configure(EntityTypeBuilder<Entities.Organization> builder)
        {
            builder.ToTable("Organization");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).UseHiLo("organizationseq");
            
            builder.Property<string>("OrganizationName")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("OrganizationName")
                .IsRequired();

            builder.Property<string>("OrganizationId")
                .HasColumnType("VARCHAR(30)")
                .HasColumnName("OrganizationId");

            builder.Property<DateTime>("JoinedOn")
                .HasColumnType("datetime")
                .HasColumnName("JoinedOn");

            builder.Property<string>("Description")
                .HasColumnType("VARCHAR(100)")
                .HasColumnName("Description");            
        }
    }
}
