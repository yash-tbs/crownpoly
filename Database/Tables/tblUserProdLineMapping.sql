
CREATE TABLE tblUserProdLineMapping
(
Id int primary key identity(1,1),
UserId int,
PLId nvarchar(100),
CreateDate datetime,
CreatedBy int,
UpdateDate datetime,
UpdateBy int,
IsActive bit
)

