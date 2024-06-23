import { Suspense } from "react";
import { wait } from "@/lib/wait";
import { currentUser, User } from "@clerk/nextjs/server";
import prisma from "@/lib/wait";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SadFace from "@/components/icons/SadFace";
import CreateCollectionBtn from "@/components/local-UI/Collection/CreateCollectionBtn";
import CollectionCard from "@/components/local-UI/Collection/CollectionCard";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeFallback />}>
        <Welcome />
      </Suspense>
      <Suspense fallback={<p>Loading collections...</p>}>
        <UserRelatedCollection />
      </Suspense>
    </>
  );
}

async function Welcome() {
  const user = await currentUser();
  await wait(500);

  if (!user) {
    <div className=" font-semibold text-3xl bg-gradient-to-r from-red-400 to-red-700">
      Not signed in
    </div>;
  }
  return (
    <h1 className=" font-bold text-4xl mb-12">
      Welcome{" "}
      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {user?.firstName}
      </span>
    </h1>
  );
}

function WelcomeFallback() {
  return (
    <div className=" flex flex-col gap-2 mb-12">
      <Skeleton className=" w-[150px] h-[20px]" />
      <Skeleton className=" w-[100px] h-[20px]" />
    </div>
  );
}

async function UserRelatedCollection() {
  const user = await currentUser();
  const userCollection = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (userCollection.length === 0) {
    return (
      <div className=" flex flex-col gap-5 mt-4">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collection.</AlertTitle>
          <AlertDescription>
            Create a collection to get started.
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {userCollection.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
