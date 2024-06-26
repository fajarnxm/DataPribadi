USE [DataPribadi]
GO
/****** Object:  Table [dbo].[Identitas]    Script Date: 6/24/2024 15:12:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Identitas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nik] [int] NOT NULL,
	[NamaLengkap] [nvarchar](max) NOT NULL,
	[JenisKelamin] [nvarchar](10) NULL,
	[TanggalLahir] [datetime] NULL,
	[Alamat] [nvarchar](max) NULL,
	[Negara] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Identitas] ON 

INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (1, 101, N'DEDES', N'Perempuan', CAST(N'2014-01-08T00:00:00.000' AS DateTime), N'Bekasi', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (2, 111, N'HERI', N'Laki-Laki', CAST(N'2024-06-10T00:00:00.000' AS DateTime), N'Kampung', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (4, 189, N'GADIS', N'Perempuan', CAST(N'2024-06-01T00:00:00.000' AS DateTime), N'Bekasi', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (5, 121, N'BUDI', N'Laki-Laki', CAST(N'2024-05-30T00:00:00.000' AS DateTime), N'Depok', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (6, 199, N'XYZ', N'Perempuan', CAST(N'2024-05-31T00:00:00.000' AS DateTime), N'Bandung', N'Hungary')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (7, 112, N'Joko', N'Laki-Laki', CAST(N'2024-02-04T00:00:00.000' AS DateTime), N'Jl. Perjuangan', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (8, 898, N'Hudya', N'Laki-Laki', CAST(N'2024-02-07T00:00:00.000' AS DateTime), N'Bks', N'Indonesia')
INSERT [dbo].[Identitas] ([Id], [Nik], [NamaLengkap], [JenisKelamin], [TanggalLahir], [Alamat], [Negara]) VALUES (9, 970, N'DADANG', N'Laki-Laki', CAST(N'2023-12-06T00:00:00.000' AS DateTime), N'Jalan', N'Indonesia')
SET IDENTITY_INSERT [dbo].[Identitas] OFF
GO
ALTER TABLE [dbo].[Identitas]  WITH CHECK ADD CHECK  (([JenisKelamin]='Perempuan' OR [JenisKelamin]='Laki-Laki'))
GO
/****** Object:  StoredProcedure [dbo].[DeleteIdentitas]    Script Date: 6/24/2024 15:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteIdentitas]
    @ID INT
AS
BEGIN
    DELETE FROM Identitas
    WHERE Id = @ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetIdentitas]    Script Date: 6/24/2024 15:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetIdentitas]
AS
BEGIN
    SELECT * FROM Identitas;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertIdentitas]    Script Date: 6/24/2024 15:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertIdentitas]
    @Nik INT,
    @NamaLengkap NVARCHAR(255),
    @JenisKelamin NVARCHAR(10),
    @TanggalLahir DATE,
    @Alamat NVARCHAR(500),
    @Negara NVARCHAR(50),
    @InsertedId INT OUTPUT
AS
BEGIN
    INSERT INTO Identitas (Nik, NamaLengkap, JenisKelamin, TanggalLahir, Alamat, Negara)
    VALUES (@Nik, @NamaLengkap, @JenisKelamin, @TanggalLahir, @Alamat, @Negara);

    SET @InsertedId = SCOPE_IDENTITY();
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchIdentitas]    Script Date: 6/24/2024 15:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchIdentitas]
    @Keyword NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM Identitas
    WHERE
        Nik LIKE '%' + @Keyword + '%' OR
        NamaLengkap LIKE '%' + @Keyword + '%';
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateIdentitas]    Script Date: 6/24/2024 15:12:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateIdentitas]
	@Id INT,
    @Nik INT,
    @NamaLengkap NVARCHAR(MAX),
    @JenisKelamin NVARCHAR(10),
    @TanggalLahir DATE,
    @Alamat NVARCHAR(MAX),
    @Negara NVARCHAR(50)
AS
BEGIN
    UPDATE Identitas
    SET
		Nik = @Nik,
        NamaLengkap = @NamaLengkap,
        JenisKelamin = @JenisKelamin,
        TanggalLahir = @TanggalLahir,
        Alamat = @Alamat,
        Negara = @Negara
    WHERE Id = @Id;
END;

GO
