using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ads.Entities;

namespace Ads.Persistence.EntityConfiguration
{
	public class AdVolunteerEntityTypeConfiguration : IEntityTypeConfiguration<AdVolunteerEntity>
    {
        public void Configure(EntityTypeBuilder<AdVolunteerEntity> builder)
        {
            builder.ToTable("AdsVolunteers");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).ValueGeneratedOnAdd();

            builder.Property<string>("VolunteerId")
                .HasColumnType("VARCHAR(100)")
                .HasColumnName("volunteer_id");

            builder.Property<string>("AdId")
                .HasColumnType("NVARCHAR(450)")
                .HasColumnName("ad_id");

            builder.HasOne<AdEntity>()
                .WithMany(a => a.Volunteers)
                .HasForeignKey(v => v.AdId)
                .OnDelete(DeleteBehavior.Cascade);

        }
	}
}

