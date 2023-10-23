
CREATE TABLE tblProdLines
(
Id int primary key identity(1,1),
Name nvarchar(100),
CreateDate datetime,
CreatedBy int,
UpdateDate datetime,
UpdateBy int,
IsActive bit
)