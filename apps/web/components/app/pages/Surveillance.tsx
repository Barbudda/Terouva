import { useNavigate } from "react-router-dom";
import { Button } from "@app/components/ui/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@app/components/ui/Card";

/**
 * Placeholder LOT 3. La vraie page « État extension » (statut du handshake,
 * EXT_ID, dernière synchro, journal des détections) est construite au LOT 5,
 * quand le pont `externally_connectable` remplace l'ancien serveur local.
 */
export default function Surveillance() {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connexion à l'extension</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 text-sm text-zinc-400">
          <p>
            La connexion à l'extension Chrome (détection en direct sur tes onglets
            Leboncoin) arrive très bientôt. En attendant, tu peux déjà alimenter ton
            feed en collant un <strong>email d'alerte Leboncoin</strong> ou une URL
            d'annonce depuis la page <em>Mes annonces</em>.
          </p>
          <p className="text-xs text-zinc-500">
            Tes données restent dans ton navigateur — aucun serveur, aucun compte.
          </p>
          <div>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Aller à mes annonces
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
