<?php

namespace App\Controller;

use App\Entity\Possession;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PossessionController extends AbstractController
{
    #[Route('/possession', name: 'app_possession')]
    public function index(): Response
    {
        return $this->render('possession/index.html.twig', [
            'controller_name' => 'PossessionController',
        ]);
    }

    /**
     * @Route("/possession/new")
     */
    public function new(EntityManagerInterface $entityManager)
    {
        $possession = new Possession();
        $possession->setUser('20')
            ->setNom('Table')
            ->setValeur(60)
            ->setType('meuble');

        $entityManager->persist($possession);
        $entityManager->flush();

        return new Response(sprintf('
        possession#%d
        Nom :  %s
          Valeur: %f
          Type: %s',
            $possession->getId(),
            $possession->getNom(),
            $possession->getValeur(),
            $possession->getType()
        ));
    }
}
