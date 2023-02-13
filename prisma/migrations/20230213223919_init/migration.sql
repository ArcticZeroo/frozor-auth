-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allowedRedirectUris" TEXT[],
    "clientId" TEXT NOT NULL,
    "clientSecretHash" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserAppRegistration" (
    "id" SERIAL NOT NULL,
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "UserAppRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isTemporaryNonce" BOOLEAN NOT NULL DEFAULT false,
    "userAppRegistrationId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserAppRegistration" ADD CONSTRAINT "UserAppRegistration_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppRegistration" ADD CONSTRAINT "UserAppRegistration_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userAppRegistrationId_fkey" FOREIGN KEY ("userAppRegistrationId") REFERENCES "UserAppRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
