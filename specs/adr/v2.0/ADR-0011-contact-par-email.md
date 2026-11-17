# ADR-0011 : Contact par e-mail (remplace la règle P3)

## Statut
Accepté (2026-11-17) — demande de Koya : « ajoute mon mail koya.esdras@gmail.com, qui ouvre un mail au clic ».

## Contexte
La v1 interdisait tout lien `mailto:` ou `tel:` (P3) : les clients passaient par les plateformes. Un portfolio de freelance doit permettre un contact direct.

## Décision
- Un lien `mailto:koya.esdras@gmail.com` dans l'accueil (« Email me » / « M'écrire ») et dans le contact (texte : l'adresse elle-même).
- Toujours aucun lien `tel:`.

## Conséquences
- L'adresse est publique : elle peut recevoir du spam. Koya l'accepte en la demandant.
- S9 vérifie exactement 2 liens `mailto:` par page, vers cette adresse, et aucun `tel:`.
