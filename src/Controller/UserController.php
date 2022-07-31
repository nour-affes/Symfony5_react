<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;


class UserController extends AbstractController
{

    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('user/homepage.html.twig');
    }

    /**
     * @Route ("/api/users/{id}", name="remove_user", methods= {"GET", "DELETE"})
     */
    public function remove($id, UserRepository $userRepository): Response
    {

        $user = $userRepository->find($id);
        if ($user) {
            $userRepository->remove($user, true);
            return new Response("user deleted");
        }
        return new Response("user not found");

    }

//    /**
//     * @Route("/api/users/{id}", methods={"GET", "DELETE"}, name="users_delete")
//     * @return \Symfony\Component\HttpFoundation\JsonResponse
//     */
    /*    public function delete(int $id, UserRepository $userRepo): Response
        {

    //        $userRepo = $entityManager->getRepository(User::class);
            $user = $userRepo->find($id);
            if ($user != null) {
                $userRepo->remove($user, true);
                return new Response("user deleted");
            }
    //        dd($id);
            return new Response('user is not deleted');
        }*/

    /**
     * @Route("/api/users", name="users")
     */
    public
    function getUsers(EntityManagerInterface $entityManager, SerializerInterface $serializer, UserRepository $userRepository, LoggerInterface $logger,): Response
    {

        $userRepository = $entityManager->getRepository(User::class);
        $users = $userRepository->findAll();
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $serializedData = $serializer->serialize($users, 'json');
        $response = new Response($serializedData);
        /*________*/
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
//       $response->setContent(json_encode($serializedData));
        /*________*/

        return $response;

    }

    /**
     * @Route("/", name="app_userslist")
     */
    public
    function homepage()
    {

        return $this->render('user/homepage.html.twig');
    }


}
