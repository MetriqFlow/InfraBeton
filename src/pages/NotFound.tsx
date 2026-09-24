import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const previous = document.title;
    document.title = t("meta.notFoundTitle");
    return () => { document.title = previous; };
  }, [t]);

  return (
    <Layout>
      <section className="py-32 bg-concrete">
        <div className="container text-center">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-8">{t("notFound.text")}</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-brand-foreground font-semibold rounded-md hover:bg-brand-hover transition-colors"
          >
            {t("notFound.back")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
